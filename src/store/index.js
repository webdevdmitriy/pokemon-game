import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import pokemonsReducer from './pokemons'
import pokemons1Reducer from './pokemonsPlayer1'
import pokemons2Reducer from './pokemonsPlayer2'

export default configureStore({
	reducer: {
		counter: counterReducer,
		pokemons: pokemonsReducer,
		pokemons1: pokemons1Reducer,
		pokemons2: pokemons2Reducer
	}
})
