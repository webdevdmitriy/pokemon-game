import cn from 'classnames'

import s from './style.module.css'

const NavBar = ({ onShowMenu, activeMenu }) => {
	const onClickButtonMenu = () => {
		onShowMenu && onShowMenu()
	}
	return (
		<nav className={s.root}>
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
