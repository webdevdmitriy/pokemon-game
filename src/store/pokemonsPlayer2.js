import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
	name: 'pokemons2',
	initialState: {
		data: []
	},
	reducers: {
		setPokemons2: (state, action) => ({
			...state,
			data: action.payload
		})
	}
})

export const { setPokemons2 } = slice.actions
export const selectPokemons2Data = state => state.pokemons2.data

export default slice.reducer
