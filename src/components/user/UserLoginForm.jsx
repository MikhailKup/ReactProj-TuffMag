import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loginUser } from '../../features/user/userSlice';
import styles from '../../styles/User.module.css'

const UserLoginForm = ({ toggleCurrentFormType, closeForm }) => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		username: '',
		password: ''
	});

	const [usernameDirty, setUsernameDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);

	const [usernameError, setUsernameError] = useState('Required to fill');
	const [passwordError, setPasswordError] = useState('Required to fill');

	const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
		switch(name) {
			case 'username':
				// eslint-disable-next-line no-useless-escape
				const usernameReg = /^[a-zA-Z0-9]+([_\s\-]?[a-zA-Z0-9])*$/;
				if (!usernameReg.test(value)) {
					setUsernameError('Incorrect username')
				} else if (value.length < 3 || value.length > 10){
					setUsernameError('Must be at least 3 and no more than 10 characters')
				} else {
					setUsernameError('')
				}
				break;
			case 'password':
				const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
				if (!passwordReg.test(value)) {
					setPasswordError('Incorrect password')
				} else {
					setPasswordError('')
				}
				break;
			default:
				throw new Error();
		}
  };

	const handleBlur = (e) => {
		switch(e.target.name) {
			case 'username':
				setUsernameDirty(true);
				break;
			case 'password':
				setPasswordDirty(true);
				break;
			default:
				throw new Error();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = (usernameError || passwordError) ? false : true;
		const isEmpty = Object.values(values).some(val => !val);
		if (isEmpty || isValid === false) {
			return
		}
		dispatch(loginUser(values))
		closeForm();
	};
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.close} onClick={closeForm}>
				<svg className='icon'>
					<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#close`}/>
				</svg>
			</div>

			<div className={styles.title}>
				Log In
			</div>

			<form className={styles.form} onSubmit={handleSubmit}>

				<div className={styles.group}>
					<input type="username" name='username' 
					placeholder='Your username' 
					value={values.username}
					autoComplete='off'
					onChange={handleChange}
					onBlur={e => handleBlur(e)}
					required/>
					{(usernameDirty && usernameError) && <p className={styles.formError}>{usernameError}</p>}
				</div>

				<div className={styles.group}>
					<input type="password" name='password' 
					placeholder='Your password' 
					value={values.password}  
					autoComplete='off'
					onChange={handleChange}
					onBlur={e => handleBlur(e)}
					required/>
					{(passwordDirty && passwordError) && <p className={styles.formError}>{passwordError}</p>}
				</div>

				<div className={styles.link} onClick={() => toggleCurrentFormType('signup')}>
					Create an account
				</div>

				<button type='submit' className={styles.submit}>
					Log in
				</button>
			</form>
		</div>
	);
};

export default UserLoginForm