import s from './style.module.css'
const Menu = () => {
	return (
		<div class='menuContainer active/deactive'>
			<div class='overlay' />
			<div class='menuItems'>
				<ul>
					<li>
						<a href='#welcome'>HOME</a>
					</li>
					<li>
						<a href='#game'>GAME</a>
					</li>
					<li>
						<a href='#about'>ABOUT</a>
					</li>
					<li>
						<a href='#contact'>CONTACT</a>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Menu
