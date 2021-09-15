import cn from 'classnames'
import { Link } from 'react-router-dom'

import s from './style.module.css'

const MENU = [
	{
		title: 'HOME',
		to: '#welcome'
	},
	{
		title: 'GAME',
		to: 'game'
	},
	{
		title: 'HOME',
		to: '#about'
	},
	{
		title: 'CONTACT',
		to: '#contact'
	}
]

const Menu = ({ activeMenu }) => {
	return (
		<div className={cn(s.menuContainer, { [s.active]: activeMenu === true, [s.deactive]: activeMenu === false })}>
			<div className={s.overlay} />
			<div className={s.menuItems}>
				<ul>
					{MENU.map(({ title, to }, index) => {
						return (
							<li key={index}>
								<Link to={to}>{title}</Link>
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default Menu
