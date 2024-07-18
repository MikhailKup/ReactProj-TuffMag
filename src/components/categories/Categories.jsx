import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';
import styles from '../../styles/Categories.module.css'
import electronicsCat from '../../images/electronicsCat.jpg'
import jeweleryCat from '../../images/jeverlyCat.jpg'
import mensCat from '../../images/mensCat.jpg'
import womensCat from '../../images/womensCat.jpg'

const getCategoryImage = (element) => {
	switch(element) {
		case "electronics":
			return electronicsCat;
		case "jewelery":
			return jeweleryCat;
		case "men's clothing":
			return mensCat;
		case "women's clothing":
			return womensCat;
		default:
			throw new Error();
	}
};

const Categfories = ({ title, categories, amount }) => {
	const list = categories.filter((_, i) => i < amount);
	return (
		<section className={styles.section}>
			<h2 className={styles.section}>{title}</h2>
			<div className={styles.list}>
				{list.map((el) => (
					<Link to={`/products/categories/${el}`} key={uuidv4()} className={styles.item}>
						<div className={styles.image} style={{ backgroundImage: `url(${getCategoryImage(el)})` }} />
						<h3 className={styles.title}>{el.charAt(0).toUpperCase() + el.slice(1)}</h3>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Categfories;