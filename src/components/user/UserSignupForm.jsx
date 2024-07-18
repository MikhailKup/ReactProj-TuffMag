import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

import { createUser } from '../../features/user/userSlice';
import styles from '../../styles/User.module.css'

const UserSignupForm = ({ toggleCurrentFormType, closeForm }) => {
	const dispatch = useDispatch();
	const [values, setValues] = useState({
		username: '',
		email: '',
		password: '',
		number: '',
		id: uuidv4()
	});

	const [usernameDirty, setUsernameDirty] = useState(false);
	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [numberDirty, setNumberDirty] = useState(false);

	const [usernameError, setUsernameError] = useState('Required to fill');
	const [emailError, setEmailError] = useState('Required to fill');
	const [passwordError, setPasswordError] = useState('Required to fill');
	const [numberError, setNumberError] = useState('Required to fill');

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
			case 'email':
				const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				if (!emailReg.test(String(value).toLowerCase())) {
					setEmailError('Incorrect email')
				} else {
					setEmailError('')
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
			case 'number':
				const numberReg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
				if (!numberReg.test(value)) {
					setNumberError('Incorrect phone number')
				} else {
					setNumberError('')
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
			case 'email':
				setEmailDirty(true);
				break;
			case 'password':
				setPasswordDirty(true);
				break;
			case 'number':
				setNumberDirty(true);
				break;
			default:
				throw new Error();
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = (usernameError || emailError || passwordError || numberError) ? false : true;
		const isEmpty = Object.values(values).some(val => !val);
		if (isEmpty || isValid === false) {
			return
		}
		dispatch(createUser(values))
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
				Sign Up
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
					<input type="email" name='email' 
					placeholder='Your email' 
					value={values.email} 
					autoComplete='off'
					onChange={handleChange}
					onBlur={e => handleBlur(e)}
					required/>
					{(emailDirty && emailError) && <p className={styles.formError}>{emailError}</p>}
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

				<div className={styles.group}>
					<input type="number" name='number' 
					placeholder='Your phone number' 
					value={values.number}  
					autoComplete='off'
					onChange={handleChange}
					onBlur={e => handleBlur(e)}
					required/>
					{(numberDirty && numberError) && <p className={styles.formError}>{numberError}</p>}
				</div>

				<div className={styles.link} onClick={() => toggleCurrentFormType('login')}>
					I already have an account
				</div>

				<button type='submit' className={styles.submit}>
					Create an account
				</button>
			</form>
		</div>
	);
};

export default UserSignupForm