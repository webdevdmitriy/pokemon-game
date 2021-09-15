import cn from 'classnames'

import s from './style.module.css'

const NavBar = ({ onShowMenu, bgActive = false, activeMenu }) => {
	const onClickButtonMenu = () => {
		onShowMenu && onShowMenu()
	}
	return (
		<nav className={cn(s.root, { [s.bgActive]: bgActive })}>
			<div className={s.navWrapper}>
				<p className={s.brand}>LOGO</p>
				<a className={cn(s.menuButton, { [s.active]: activeMenu })} onClick={onClickButtonMenu}>
					<span />
				</a>
			</div>
		</nav>
	)
}

export default NavBar
