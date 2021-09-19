import React, { useState } from 'react'
import Menu from '../Menu'
import NavBar from '../NavBar'

const MenuHeader = ({ bgActive }) => {
	const [activeMenu, setMenuActive] = useState(null)
	const handleShowMenu = () => setMenuActive(prevState => !prevState)

	return (
		<React.Fragment>
			<Menu onShowMenu={handleShowMenu} activeMenu={activeMenu} />
			<NavBar onShowMenu={handleShowMenu} bgActive={bgActive} activeMenu={activeMenu} />
		</React.Fragment>
	)
}

export default MenuHeader
