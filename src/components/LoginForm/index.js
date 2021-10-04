import { useEffect, useState } from 'react/cjs/react.development'
import Input from '../Input'
import s from './style.module.css'

const LoginForm = ({ onSubmit, isOpenModal, isAuth, onChangeAuth, isResetField = false }) => {
	const [email, setEmail] = useState('test@mail.ru')
	const [password, setPassword] = useState('')

	const [isLogin, setLogin] = useState(true)

	useEffect(() => {
		setEmail('')
		setPassword('')
	}, [isResetField])

	useEffect(() => {
		setEmail('')
		setPassword('')
	}, [isOpenModal])
	const handelSubmit = e => {
		e.preventDefault()
		onSubmit &&
			onSubmit({
				type: isLogin ? 'login' : 'signup',
				email,
				password
			})
	}

	return (
		<form onSubmit={handelSubmit}>
			<div className=''>
				<Input value={email} required label='Email' name='email' onChange={e => setEmail(e.target.value)} />
			</div>
			<div className=''>
				<Input
					value={password}
					type='password'
					required
					label='Password'
					name='password'
					onChange={e => setPassword(e.target.value)}
				/>
			</div>
			<button>{isLogin ? 'Signin' : 'Signup'}</button>

			<div className={s.auth} onClick={() => setLogin(!isLogin)}>
				<span> {isLogin ? 'Login' : 'Register'}</span>
			</div>
		</form>
	)
}

export default LoginForm
