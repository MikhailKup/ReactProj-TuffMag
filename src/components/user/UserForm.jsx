import { useSelector, useDispatch } from 'react-redux';
import UserSignupForm from './UserSignupForm';
import UserLoginForm from './UserLoginForm'
import { toggleForm, toggleFormType } from '../../features/user/userSlice';

import styles from '../../styles/User.module.css'

const UserForm = () => {
	const dispatch = useDispatch();
	const { showForm, formType } = useSelector(({ user }) => user);

	const closeForm = () => {
		dispatch(toggleForm(false))
	};
	const toggleCurrentFormType = (type) => {
		dispatch(toggleFormType(type))
	};
	return (
		showForm ? (
			<>
				<div className={styles.overlay} onClick={closeForm}/>
				{
				formType === 'signup' ? 
				<UserSignupForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType}/> :
				<UserLoginForm closeForm={closeForm} toggleCurrentFormType={toggleCurrentFormType}/>
				}
			</>
		) : <></>
	);
};

export default UserForm