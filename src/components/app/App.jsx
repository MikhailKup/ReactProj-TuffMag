import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import AppRoutes from '../routes/Routes';
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Sidebar from '../sidebar/Sidebar'
import UserForm from '../user/UserForm';
import { getCategories } from '../../features/categories/categoriesSlice';
import { getProducts } from '../../features/products/productsSlice';

const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCategories())
		dispatch(getProducts())
	}, [dispatch]);

	return (
		<div className="app">
			<Header/>
			<UserForm/>
			<div className="container">
				<Sidebar/>
				<AppRoutes/>
			</div>
			<Footer/>
		</div>
	);
};

export default App;