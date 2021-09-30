import { useHistory } from 'react-router'
import { useContext, useState } from 'react'

import { PokemonContext } from '../../../../context/PokemonContext'
import PokemonCard from '../../../../components/PokemonCard'

import s from './style.module.css'
import { FireBaseContext } from '../../../../context/firebaseContext'
import { selectPokemonsSelectedData } from '../../../../store/pokemonsPlayer1'
import { selectPokemons2Data } from '../../../../store/pokemonsPlayer2'
import { useSelector } from 'react-redux'

const FinishPage = () => {
	const firebase = useContext(FireBaseContext)

	const history = useHistory()
	const [choiceCard, setChoiceCard] = useState(null)

	const pokemons1Redux = useSelector(selectPokemonsSelectedData)
	const pokemons2Redux = useSelector(selectPokemons2Data)

	const [pokemonPlayer2, setPokemonPlayer2] = useState(pokemons2Redux)

	if (pokemons2Redux.length === 0) {
		history.replace('/game')
	}

	const handleClickEndButton = () => {
		if (choiceCard !== null) {
			const newPokemon = pokemons2Redux[choiceCard]

			delete newPokemon.selected
			delete newPokemon.possession
			firebase.addPokemon(newPokemon, () => {})
		}
		history.push('/game')

		// clearContext()
		// setResult(null)
	}

	const handleChoiceCard = key => {
		if (choiceCard === null) {
			setPokemonPlayer2(prevState => {
				const result = {
					...prevState,
					[key]: {
						...prevState[key],
						selected: true
					}
				}
				return result
			})
			setChoiceCard(key)
		} else if (choiceCard === key) {
			setPokemonPlayer2(prevState => {
				const result = {
					...prevState,
					[key]: {
						...prevState[key],
						selected: false
					}
				}
				return result
			})
			setChoiceCard(null)
		}
	}

	return (
		<div>
			<div className={s.root}>
				<div className={s.playerOne}>
					{Object.values(pokemons1Redux).map(item => (
						<PokemonCard
							className={s.card}
							key={item.id}
							name={item.name}
							img={item.img}
							id={item.id}
							type={item.type}
							values={item.values}
							isActive
							minimize={false}
						/>
					))}
				</div>

				<button
					className={s.button}
					type='button'
					onClick={handleClickEndButton}
					// disabled={result === 'WIN' && choiceCard === null}
				>
					END GAME
				</button>

				<div className={s.playerTwo}>
					{Object.entries(pokemonPlayer2).map(([key, { keyId, name, img, id, type, values, selected }]) => (
						<PokemonCard
							key={key}
							name={name}
							img={img}
							id={id}
							type={type}
							values={values}
							isActive={true}
							objID={key}
							minimize={false}
							isSelected={selected}
							className={s.card}
							onChangeisActive={() => {
								// if (result === 'WIN') {
								// 	handleChoiceCard(key)
								// }
								handleChoiceCard(key)
							}}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default FinishPage
