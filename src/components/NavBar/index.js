import cn from 'classnames'

import s from './style.module.css'
import { ReactComponent as LoginSVG } from '../../assets/login.svg'
import { ReactComponent as UserSVG } from '../../assets/user.svg'
import { useSelector } from 'react-redux'
import { selectLocalID, selectUserLoading } from '../../store/user'
import { Link } from 'react-router-dom'
const NavBar = ({ onShowMenu, bgActive = false, activeMenu, handleClickLogin }) => {
	const isLoadingUser = useSelector(selectUserLoading)
	const localId = useSelector(selectLocalID)
	const onClickButtonMenu = () => {
		onShowMenu && onShowMenu()
	}
	return (
		<nav className={cn(s.root, { [s.bgActive]: bgActive })}>
			<div className={s.navWrapper}>
				<p className={s.brand}>LOGO</p>
				<div className={s.loginAndMenu}>
					{!isLoadingUser && !localId && (
						<div className={s.loginWrap} onClick={handleClickLogin}>
							<LoginSVG />
						</div>
					)}
					{!isLoadingUser && localId && (
						<Link className={s.loginWrap} to={'/user'}>
							<UserSVG />
						</Link>
					)}
					<div className={cn(s.menuButton, { [s.active]: activeMenu })} onClick={onClickButtonMenu}>
						<span />
					</div>
				</div>
			</div>
		</nav>
	)
}

export default NavBar
