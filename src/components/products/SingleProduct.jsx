import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetProductQuery } from '../../features/api/apiSlice';
import { ROUTES } from '../../utils/routes'
import Product from './Product';
import Products from './products';
import { getRelatedProducts } from '../../features/products/productsSlice';

const SingleProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({id});
	const dispatch = useDispatch();
	const { list, related } = useSelector(({products}) => products);

	useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

	useEffect(() => {
		if (!data || !list.length) return;
		dispatch(getRelatedProducts(data))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data, dispatch, list.length]);

	return !data ? 
		(<section className='preloader'>Loading</section>) :
		(
			<>
				<Product {...data}/>
				<Products products={related} amount={5} title='Related products'/>
			</>
		)
};

export default SingleProduct