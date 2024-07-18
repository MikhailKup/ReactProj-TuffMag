import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes'
import { addItemToCart, addItemToFavorites } from '../../features/user/userSlice';

import styles from '../../styles/Product.module.css'

const Product = (item) => {
	const { title, image, price, description } = item;
	const dispatch = useDispatch();

	const addToCart = () => {
		dispatch(addItemToCart(item))
	};
	const addToFavorites = () => {
		dispatch(addItemToFavorites(item))
	};
	return (
		<section className={styles.product}>
			<div className={styles.images}>
				<div className={styles.current} style={{ backgroundImage: `url(${image})`}}></div>
			</div>
			
			<div className={styles.info}>
				<h1 className={styles.title}>{title}</h1>

				<div className={styles.price}>{price} $</div>

				<p className={styles.description}>{description}</p>

				<div className={styles.actions}>
					<button className={styles.add} onClick={addToCart}>Add to cart</button>
					<button className={styles.favourite} onClick={addToFavorites}>Add to favourites</button>
				</div>

				<div className={styles.bottom}>
					<div className={styles.purchase}>19 people purchased</div>
					<Link to={ROUTES.HOME}>Return to store</Link>
				</div>
			</div>

		</section>
	);
};

export default Product