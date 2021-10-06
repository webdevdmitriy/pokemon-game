import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from './pokemons'
import pokemons1Reducer from './pokemonsPlayer1'
import pokemons2Reducer from './pokemonsPlayer2'
import userReducer from './user'

export default configureStore({
	reducer: {
		user: userReducer,
		pokemons: pokemonsReducer,
		pokemons1: pokemons1Reducer,
		pokemons2: pokemons2Reducer
	}
})
