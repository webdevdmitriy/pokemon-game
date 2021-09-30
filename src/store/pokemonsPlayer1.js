import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
	name: 'pokemonsSelected',
	initialState: {
		data: {}
	},
	reducers: {
		setPokemonsSelected: (state, action) => {
			if (state.data[action.payload.key]) {
				const copyStateData = { ...state.data }
				delete copyStateData[action.payload.key]

				return {
					...state,
					data: copyStateData
				}
			}

			return {
				...state,
				data: {
					...state.data,
					[action.payload.key]: action.payload.pokemon
				}
			}
		}
	}
})

export const { setPokemonsSelected } = slice.actions
export const selectPokemonsSelectedData = state => state.pokemons1.data

export default slice.reducer
