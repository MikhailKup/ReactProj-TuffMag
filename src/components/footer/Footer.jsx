import { Link } from 'react-router-dom'
import { ROUTES } from "../../utils/routes";

import styles from '../../styles/Footer.module.css'
import Logo from '../../images/logo.svg'

const Footer = () => {
	return (
		<section className={styles.footer}>
			<div className={styles.logo}>
				<Link to={ROUTES.HOME}>
					<img src={Logo} alt="Logo" />
				</Link>
			</div>

			<div className={styles.rights}>
				Developed by <a href="https://github.com/MikhailKup" target='_blank' rel="noreferrer">Mikhail Kuplinov</a>
			</div>
			<div className={styles.socials}>
				<a href="https://www.instagram.com/" target='_blank' rel="noreferrer">
					<svg className='icon'>
						<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#instagram`} />
					</svg>
				</a>
				<a href="https://www.youtube.com/" target='_blank' rel="noreferrer">
					<svg className='icon'>
						<use xlinkHref={`${process.env.PUBLIC_URL}/sprite.svg#youtube`} />
					</svg>
				</a>
			</div>
		</section>
	);
};

export default Footer;