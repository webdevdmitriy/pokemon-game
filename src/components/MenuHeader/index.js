import React, { useState } from 'react'
import LoginForm from '../LoginForm'
import Menu from '../Menu'
import Modal from '../Modal'
import NavBar from '../NavBar'
import { NotificationContainer, NotificationManager } from 'react-notifications'
import { useEffect } from 'react/cjs/react.development'
import { useDispatch } from 'react-redux'
import { getUserUpdateAsync } from '../../store/user'

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

	const dispatch = useDispatch()

	const handleShowMenu = () => setMenuActive(prevState => !prevState)

	const handleClickLogin = () => {
		setOpenModal(prevState => !prevState)
	}

	const handleSubmitLoginForm = async props => {
		const response = await loginSignupUser(props)
		console.log('props', props)
		if (response.hasOwnProperty('error')) {
			NotificationManager.error(response.error.message, 'Wrong!')
		} else {
			if (props.type === 'signup') {
				const pokemonsStart = await fetch('https://reactmarathon-api.herokuapp.com/api/pokemons/starter').then(res =>
					res.json()
				)
				console.log('pokemonsStart', pokemonsStart)
				for (const item of pokemonsStart.data) {
					await fetch(
						`https://pokemon-game-a5653-default-rtdb.firebaseio.com/${response.localId} / pokemons.json?auth = ${response.idToken}`,
						{
							method: 'POST',
							body: JSON.stringify(item)
						}
					)
				}
			}
			localStorage.setItem('idToken', response.idToken)
			NotificationManager.success('Ништяк, все получилось')
			dispatch(getUserUpdateAsync())
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
