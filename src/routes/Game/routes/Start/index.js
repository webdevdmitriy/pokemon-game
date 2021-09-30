import { useState, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PokemonCard from '../../../../components/PokemonCard'

import { FireBaseContext } from '../../../../context/firebaseContext'
import { PokemonContext } from '../../../../context/PokemonContext'
import { selectPokemonsData, getPokemonsAsync, selectPokemonsLoading } from '../../../../store/pokemons'
import { selectPokemonsSelectedData, setPokemonsSelected } from '../../../../store/pokemonsPlayer1'

import s from './style.module.css'

const StartPage = () => {
	const isLoading = useSelector(selectPokemonsLoading)

	const pokemonsRedux = useSelector(selectPokemonsData)
	const pokemons1Redux = useSelector(selectPokemonsSelectedData)

	const dispatch = useDispatch()

	const history = useHistory()
	const [pokemons, setpokemons] = useState({})

	useEffect(() => {
		dispatch(getPokemonsAsync())
	}, [])

	useEffect(() => {
		setpokemons(pokemonsRedux)
	}, [pokemonsRedux])

	const selectPokemon = key => {
		const pokemon = { ...pokemons[key] }
		setpokemons(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				selected: !prevState[key].selected
			}
		}))
		dispatch(setPokemonsSelected({ key, pokemon }))
	}

	const startGame = () => {
		history.push('/game/board')
	}

	return (
		<div>
			<div style={{ display: 'block', margin: '0, auto' }}>
				<button onClick={startGame} disabled={Object.keys(pokemons1Redux).length < 5}>
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
							if (Object.keys(pokemons1Redux).length < 5 || selected) {
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
