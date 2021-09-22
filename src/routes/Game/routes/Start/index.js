import { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import PokemonCard from '../../../../components/PokemonCard'

import { FireBaseContext } from '../../../../context/firebaseContext'
import { PokemonContext } from '../../../../context/PokemonContext'

import s from './style.module.css'

const StartPage = () => {
	const firebase = useContext(FireBaseContext)

	const pokemonsContext = useContext(PokemonContext)

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
		})

		return () => {
			firebase.offPokemonSocket()
		}
	}, [])

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
