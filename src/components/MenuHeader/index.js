import React, { useState } from 'react'
import LoginForm from '../LoginForm'
import Menu from '../Menu'
import Modal from '../Modal'
import NavBar from '../NavBar'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useEffect } from 'react/cjs/react.development'

const key = 'AIzaSyCbASPLrkL9d3Zp_2SsrIGfC_dQ1JRQvjw'

const loginSignupUser = async ({ email, password, type }) => {
	const requestOptions = {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
			returnSecureToken: true
		})
	}
	switch (type) {
		case 'signup':
			return await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${key}`, requestOptions).then(
				res => res.json()
			)
		case 'login':
			return await fetch(
				`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${key}`,
				requestOptions
			).then(res => res.json())
		default:
			return 'Ошибочка'
	}
}

const MenuHeader = ({ bgActive }) => {
	const [activeMenu, setMenuActive] = useState(null)
	const [isOpenModal, setOpenModal] = useState(false)
	const handleShowMenu = () => setMenuActive(prevState => !prevState)

	const handleClickLogin = () => {
		setOpenModal(prevState => !prevState)
	}

	const handleSubmitLoginForm = async props => {
		const response = await loginSignupUser(props)

		if (response.hasOwnProperty('error')) {
			NotificationManager.error(response.error.message, 'Wrong!')
		} else {
			localStorage.setItem('idToken', response.idToken)
			NotificationManager.success('Ништяк, все получилось')
			handleClickLogin()
		}
	}

	return (
		<React.Fragment>
			<Menu onShowMenu={handleShowMenu} activeMenu={activeMenu} />
			<NavBar
				onShowMenu={handleShowMenu}
				bgActive={bgActive}
				activeMenu={activeMenu}
				handleClickLogin={handleClickLogin}
			/>

			<Modal isOpen={isOpenModal} title='Auth...' onCloseModal={handleClickLogin}>
				<LoginForm
					isResetField={!isOpenModal}
					isOpenModal={isOpenModal}
					onChangeAuth={handleClickLogin}
					onSubmit={handleSubmitLoginForm}
				/>
			</Modal>
		</React.Fragment>
	)
}

export default MenuHeader
