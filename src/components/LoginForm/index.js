import { useState } from 'react/cjs/react.development'

const LoginForm = ({ onSubmit }) => {
	const [email, setEmail] = useState('test@mail.ru')
	const [password, setPassword] = useState('')
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
	return (
		<form onSubmit={handelSubmit}>
			<div className=''>
				<input value={email} name='email' onChange={e => setEmail(e.target.value)} />
			</div>
			<div className=''>
				<input value={password} type='password' name='password' onChange={e => setPassword(e.target.value)} />
			</div>
			<button>Login</button>
		</form>
	)
}

export default LoginForm
