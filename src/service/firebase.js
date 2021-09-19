import firebase from 'firebase/compat/app'
import 'firebase/compat/database'
const firebaseConfig = {
	apiKey: 'AIzaSyCbASPLrkL9d3Zp_2SsrIGfC_dQ1JRQvjw',
	authDomain: 'pokemon-game-a5653.firebaseapp.com',
	databaseURL: 'https://pokemon-game-a5653-default-rtdb.firebaseio.com',
	projectId: 'pokemon-game-a5653',
	storageBucket: 'pokemon-game-a5653.appspot.com',
	messagingSenderId: '845300385257',
	appId: '1:845300385257:web:557fe1b07a01db0bddb778'
}

firebase.initializeApp(firebaseConfig)

export const fore = firebase

export const database = firebase.database()

export default database
