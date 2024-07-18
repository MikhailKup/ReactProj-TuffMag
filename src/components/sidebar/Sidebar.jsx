import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { NavLink } from 'react-router-dom'
import styles from '../../styles/Sidebar.module.css'

const Sidebar = () => {
	const { list } = useSelector(({categories}) => categories);
	return (
		<section className={styles.sidebar}>
			<div className={styles.title}>CATEGORIES</div>
			<nav>
				<ul className={styles.menu}>
					{list.map((el) => 
						<li key={uuidv4()}>
							<NavLink 
							className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
							to={`/products/category/${el}`}>
								{el.charAt(0).toUpperCase() + el.slice(1)}
							</NavLink>
						</li>
					)}
				</ul>
			</nav>

			<div className={styles.footer}>
				<a href='/help' target='_blank' rel="noreferrer" className={styles.link}>
					Help
				</a>
				<a href='/terms' target='_blank' rel="noreferrer" className={styles.link} style={{textDecoration: 'underline'}}>
					Terms & Conditions
				</a>
			</div>
		</section>
	);
};

export default Sidebar;