import { useEffect, useState } from 'react/cjs/react.development'
import Input from '../Input'

const LoginForm = ({ onSubmit, isOpenModal }) => {
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
		console.log(email)
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
			<button>Login</button>
		</form>
	)
}

export default LoginForm
