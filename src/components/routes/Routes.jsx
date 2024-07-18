import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import SingleProduct from '../products/SingleProduct';
import Profile from '../profile/Profile';
import SingleCategory from '../categories/SingleCategory';
import Cart from '../cart/Cart';
import Favorites from '../favorites/Favorites';
import { ROUTES } from "../../utils/routes";

const AppRoutes = () => {
	return (
		<Routes>
			<Route path={ROUTES.HOME} element={<Home />}/>
			<Route path={ROUTES.PRODUCT} element={<SingleProduct />}/>
			<Route path={ROUTES.PROFILE} element={<Profile />}/>
			<Route path={ROUTES.CATEGORY} element={<SingleCategory />}/>
			<Route path={ROUTES.CART} element={<Cart />}/>
			<Route path={ROUTES.FAVORITES} element={<Favorites />}/>
		</Routes>
	);
};

export default AppRoutes;