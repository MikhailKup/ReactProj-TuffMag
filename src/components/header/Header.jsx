import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { ROUTES } from "../../utils/routes";
import { toggleForm } from '../../features/user/userSlice';
import { useGetProductsQuery } from '../../features/api/apiSlice';

import styles from '../../styles/Header.module.css'
import Logo from '../../images/logo.svg'
import Avatar from '../../images/User.png'

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [searchValue, setSearchValue] = useState('');
	const { currentUser, cart } = useSelector(({ user }) => user);

	const [values, setValues] = useState({
		username: 'Guest',
		avatar: Avatar,
	});

	const { data, isLoading } = useGetProductsQuery({title: searchValue })

	useEffect(() => {
		if (!currentUser) return
		setValues(currentUser)
	}, [currentUser]);

	const handleClick = () => {
		if (!currentUser) {
			dispatch(toggleForm(true))
		} else {
			navigate(ROUTES.PROFILE)
		}
	};

	const handleSearch = ({ target: { value }}) => {
		setSearchValue(value)
	};

	return (
		<div className={styles.header}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={Logo} alt="Logo" />
				</Link>
			</div>

			<div className={styles.info}>
				<div className={styles.user} onClick={handleClick}>
					<div className={styles.avatar} style={{backgroundImage: `url(${Avatar})`}} />
					<div className={styles.username}>
						{currentUser ? values.username : 'Guest'}
					</div>
				</div>
				<form className={styles.form}>
					<div className={styles.icon}>
						<svg className='icon'>
							<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#search`}/>
						</svg>
					</div>

					<div className={styles.input}>
						<input type="search" 
						name='search' 
						placeholder='Search for anything...' 
						autoComplete='off'
						onChange={handleSearch}
						value={searchValue}
						/>
					</div>

					{ searchValue && 
					<div className={styles.box}>
						{isLoading ? 'Loading' : !data.length ? 'No results' : (
							data.map(({ title, image, id}) => {
								return (
									<Link to={`/products/${id}`} className={styles.item} onClick={() => setSearchValue('')} key={id}>
										<div className={styles.image} style={{backgroundImage: `url(${image})`}} /> 
										<div className={styles.title}>{title}</div>
									</Link>
								)
							})
						)}
					</div>
					}
				</form>

				<div className={styles.account}>
					<Link to={ROUTES.FAVORITES} className={styles.favorites}>
						<svg className={styles["icon-fav"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#heart`} />
            </svg>
					</Link>

					<Link to={ROUTES.CART} className={styles.cart}>
						<svg className={styles["icon-cart"]}>
              <use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#bag`} />
            </svg>
						{cart.length && (
							<span className={styles.count}>{cart.length}</span>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Header;