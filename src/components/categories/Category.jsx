import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../../features/api/apiSlice';

import styles from '../../styles/Category.module.css'
import Products from '../products/products';

const Category = () => {
	const { name } = useParams();
	const { data, isLoading } = useGetProductsQuery({ name });

	return (
		<section className={styles.wrapper}>
			<h2 className={styles.title}>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
			{isLoading ? (
				<div className='preloader'>Loading...</div>
			) : (
				<Products 
				title="" 
				products={data} 
				style={{ padding: 0}} 
				amount={5}/>
			)}
		</section>
	);
};

export default Category