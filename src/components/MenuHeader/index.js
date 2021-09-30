import React, { useState } from 'react'
import LoginForm from '../LoginForm'
import Menu from '../Menu'
import Modal from '../Modal'
import NavBar from '../NavBar'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useEffect } from 'react/cjs/react.development'

const MenuHeader = ({ bgActive }) => {
	const [activeMenu, setMenuActive] = useState(null)
	const [isOpenModal, setOpenModal] = useState(false)
	const handleShowMenu = () => setMenuActive(prevState => !prevState)
	const handleClickLogin = () => {
		setOpenModal(prevState => !prevState)
	}

	const handleSubmitLoginForm = async ({ email, password }) => {
		const requestOptions = {
			method: 'POST',
			body: JSON.stringify({
				email,
				password,
				returnSecureToken: true
			})
		}
		const response = await fetch(
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCbASPLrkL9d3Zp_2SsrIGfC_dQ1JRQvjw',
			requestOptions
		).then(res => res.json())
		if (response.hasOwnProperty('error')) {
			NotificationManager.error(response.error.message, 'Wrong!')
		} else {
			localStorage.setItem('idToken', response.idToken)
			NotificationManager.success('Ништяк, все получилось')
		}
	}

	return (
		<React.Fragment>
			<Menu onShowMenu={handleShowMenu} activeMenu={activeMenu} />
			<NavBar onShowMenu={handleShowMenu} bgActive={bgActive} activeMenu={activeMenu} onClickLogin={handleClickLogin} />

			<Modal isOpen={isOpenModal} title='Log in' onCloseModal={handleClickLogin}>
				<LoginForm onSubmit={handleSubmitLoginForm} />
			</Modal>
		</React.Fragment>
	)
}

export default MenuHeader
