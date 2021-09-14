import React, { useState } from 'react'
import Menu from '../Menu'
import NavBar from '../NavBar'

import s from './style.module.css'

const MenuHeader = () => {
	const [activeMenu, setMenuActive] = useState(false)
	const handleShowMenu = () => setMenuActive(prevState => !prevState)

	return (
		<React.Fragment>
			<Menu activeMenu={activeMenu} />
			<NavBar onShowMenu={handleShowMenu} activeMenu={activeMenu} />
		</React.Fragment>
	)
}

export default MenuHeader
