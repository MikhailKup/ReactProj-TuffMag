import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

import styles from '../../styles/Products.module.css'

const Products = ({ title, style = {}, products = [], amount }) => {
	const list = products.filter((_, i) => i < amount);

	return (
		<section className={styles.products} style={style}>
			{title && <h2>{title}</h2>}
			<div className={styles.list}>
				{list.map(({ id, title, image, price, category }) => (
					<Link to={`/products/${id}`} key={uuidv4()} className={styles.product}>
						<div className={styles.image} style={{ backgroundImage: `url(${image})` }} />
						<div className={styles.wrapper}>
							<h3 className={styles.title}>{title}</h3>
							<div className={styles.cat}>{category}</div>
							<div className={styles.info}>
								<div className={styles.prices}>
									<div className={styles.price}>{price}$</div>
									<div className={styles.oldPrice}>{Math.floor(price * 1.8)}$</div>
								</div>
								<div className={styles.purchases}>
									{Math.floor(Math.random() * 20 + 1)} purchased
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
};

export default Products;