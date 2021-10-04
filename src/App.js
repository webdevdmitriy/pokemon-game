import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
import cn from 'classnames'
import { NotificationContainer } from 'react-notifications'

import HomePage from './routes/Home'
import GamePage from './routes/Game'

import AboutPage from './routes/About'
import ContactsPage from './routes/Contacts'
import MenuHeader from './components/MenuHeader'
import NotFoundPage from './routes/NotFound'
import Footer from './components/Footer'

import { FireBaseContext } from './context/firebaseContext'
import Firebase from './service/firebase'

import s from './style.module.css'
import 'react-notifications/lib/notifications.css'
import FirebaseClass from './service/firebase'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
	const location = useLocation('/')
	const isPadding = location.pathname === '/' || location.pathname === 'game/board'
	return (
		<>
			<Switch>
				<Route path='/404' component={NotFoundPage} />
				<Route>
					<>
						<MenuHeader bgActive={!isPadding} />
						<div className={cn(s.wrap, { [s.isHomePage]: isPadding })}>
							<Switch>
								<Route path='/' exact component={HomePage} />
								<PrivateRoute path='/game' component={GamePage} />
								<PrivateRoute path='/about' component={AboutPage} />
								<Route path='/contacts' component={ContactsPage} />
								<Route render={() => <Redirect to='/404' />} />
							</Switch>
						</div>
						<Footer />
					</>
				</Route>
			</Switch>
			<NotificationContainer />
		</>
	)
}

export default App
