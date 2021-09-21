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
class Firebase {
	constructor() {
		this.fire = firebase
		this.database = this.fire.database()
	}
	getPokemonSocket = cb => {
		this.database.ref('pokemons').on('value', snapshot => {
			cb(snapshot.val())
		})
	}
	offPokemonSocket = cb => {
		this.database.ref('pokemons').off('value', snapshot => {
			cb(snapshot.val())
		})
	}

	getPokemonsOnce = async () => {
		return await this.database
			.ref('pokemons')
			.once('value')
			.then(snapshot => snapshot.val())
	}

	postPokemon = (key, pokemon) => {
		this.database.ref(`pokemons/${key}`).set({ ...pokemon })
	}

	addPokemon = data => {
		const newKey = this.database.ref().child('pokemons').push().key
		this.database.ref('pokemons/' + newKey).set(data)
	}
}
export default Firebase
