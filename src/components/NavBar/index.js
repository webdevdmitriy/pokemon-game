import cn from 'classnames'

import s from './style.module.css'
import { ReactComponent as LoginSVG } from '../../assets/login.svg'

const NavBar = ({ onShowMenu, bgActive = false, activeMenu, onClickLogin }) => {
	const onClickButtonMenu = () => {
		onShowMenu && onShowMenu()
	}
	return (
		<nav className={cn(s.root, { [s.bgActive]: bgActive })}>
			<div className={s.navWrapper}>
				<p className={s.brand}>LOGO</p>
				<div className={s.loginAndMenu}>
					<div className={s.loginWrap} onClick={onClickLogin}>
						<LoginSVG />
					</div>
					<div className={cn(s.menuButton, { [s.active]: activeMenu })} onClick={onClickButtonMenu}>
						<span />
					</div>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
