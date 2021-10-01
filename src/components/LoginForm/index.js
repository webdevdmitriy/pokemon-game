import { useEffect, useState } from 'react/cjs/react.development'
import Input from '../Input'
import s from './style.module.css'

const LoginForm = ({ onSubmit, isOpenModal, isAuth, onChangeAuth }) => {
	const [email, setEmail] = useState('test@mail.ru')
	const [password, setPassword] = useState('')

	useEffect(() => {
		setEmail('')
		setPassword('')
	}, [isOpenModal])
	const handelSubmit = e => {
		e.preventDefault()
		onSubmit &&
			onSubmit({
				email,
				password
			})
		setEmail('')
		setPassword('')
	}
	if (isOpenModal === 'false') {
		setEmail('')
		setPassword('')
	}

	return (
		<form onSubmit={handelSubmit}>
			<div className=''>
				{/* <input value={email} name='email' onChange={e => setEmail(e.target.value)} /> */}
				<Input value={email} required label='Email' name='email' onChange={e => setEmail(e.target.value)} />
			</div>
			<div className=''>
				{/* <input value={password} type='password' name='password' onChange={e => setPassword(e.target.value)} /> */}
				<Input
					value={password}
					type='password'
					required
					label='Password'
					name='password'
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<button>{isAuth ? 'Signin' : 'Signup'}</button>

			<div className={s.auth} onClick={onChangeAuth}>
				<span> {isAuth ? 'Login' : 'Register'}</span>
			</div>
		</form>
	)
}

export default LoginForm
