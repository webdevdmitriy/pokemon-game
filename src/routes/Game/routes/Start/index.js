import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PokemonCard from '../../../../components/PokemonCard'

import { FireBaseContext } from '../../../../context/firebaseContext'
import { PokemonContext } from '../../../../context/PokemonContext'
import { selectPokemonsData, getPokemonsAsync, selectPokemonsLoading } from '../../../../store/pokemons'

import s from './style.module.css'

const StartPage = () => {
	const firebase = useContext(FireBaseContext)
	const pokemonsContext = useContext(PokemonContext)
	const isLoading = useSelector(selectPokemonsLoading)

	const pokemonsRedux = useSelector(selectPokemonsData)
	const dispatch = useDispatch()

	const history = useHistory()
	const [pokemons, setpokemons] = useState({})

	const selectPokemon = key => {
		const pokemon = { ...pokemons[key] }
		pokemonsContext.onSelectedPokemons(key, pokemon)
		setpokemons(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				selected: !prevState[key].selected
			}
		}))
	}
	useEffect(() => {
		firebase.getPokemonSocket(pokemons => {
			setpokemons(pokemons)
			// dispatch(getPokemons(pokemons))
			dispatch(getPokemonsAsync())
		})
	}, [])

	useEffect(() => {
		setpokemons(pokemonsRedux)
	}, [pokemonsRedux])

	const startGame = () => {
		history.push('/game/board')
	}

	return (
		<div>
			<div style={{ display: 'block', margin: '0, auto' }}>
				<button onClick={startGame} disabled={Object.keys(pokemonsContext.pokemon).length < 5}>
					Start Game
				</button>
			</div>
			<div className={s.flex}>
				{Object.entries(pokemons).map(([key, { name, img, id, type, values, active, selected }]) => (
					<PokemonCard
						key={key}
						name={name}
						img={img}
						id={id}
						type={type}
						values={values}
						onChangeisActive={() => {
							if (Object.keys(pokemonsContext.pokemon).length < 5 || selected) {
								selectPokemon(key)
							}
						}}
						isActive={true}
						objID={key}
						minimize={false}
						isSelected={selected}
						className={s.card}
					/>
				))}
			</div>
		</div>
	)
}

export default StartPage
