import { useSelector } from 'react-redux'
import { selectUser } from '../../store/user'

const User = () => {
	const user = useSelector(selectUser)
	console.log('USER', user)
	return (
		<>
			<p>Email: {user.email}</p>
			<p></p>
		</>
	)
}

export default User
