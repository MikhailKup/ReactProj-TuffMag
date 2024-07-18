import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { filteredByPrice } from '../../features/products/productsSlice';

import Poster from '../poster/Poster';
import Products from '../products/products';
import Categfories from '../categories/Categories';
import Banner from '../banner/Banner';

const Home = () => {
	const dispatch = useDispatch();
	const { products: {list, filtered}, categories } = useSelector((state) => state);

	useEffect(() => {
		if (!list.length) return
		dispatch(filteredByPrice(50))
	}, [dispatch, list.length]);
	return (
		<>
			<Poster/>
			<Products products={list} amount={5} title='Trending'/>
			<Categfories categories={categories.list} amount={5} title='Worth seeing'/>
			<Banner/>
			<Products products={filtered} amount={5} title='Less than 50$'/>
		</>
	);
};

export default Home;