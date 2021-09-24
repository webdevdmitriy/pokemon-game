import { PokemonContext } from '../../context/PokemonContext'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import StartPage from './routes/Start'
import BoardPage from './routes/Board'
import FinishPage from './routes/Finish'

const GamePage = () => {
	const match = useRouteMatch()
	const [selectedPokemons, setSelectedPokemons] = useState({})
	const [pokemonPlayer2, setPokemonPlayer2] = useState([])

	const handleSelectedPokemon = (key, pokemon) => {
		setSelectedPokemons(prevState => {
			if (prevState[key]) {
				const copyPokemons = { ...prevState }
				delete copyPokemons[key]
				return copyPokemons
			}
			return {
				...prevState,
				[key]: pokemon
			}
		})
	}
	const handlePokemonPlayer2 = pokemon => {
		setPokemonPlayer2(prevState => {
			return [...prevState, ...pokemon]
		})
	}

	return (
		<PokemonContext.Provider
			value={{
				pokemon: selectedPokemons,
				onSelectedPokemons: handleSelectedPokemon,
				pokemonPlayer2: pokemonPlayer2,
				setPokemonPlayer2: setPokemonPlayer2
			}}
		>
			<Switch>
				<Route path={`${match.path}/`} exact component={StartPage} />
				<Route path={`${match.path}/board`} component={BoardPage} />
				<Route path={`${match.path}/finish`} component={FinishPage} />
			</Switch>
		</PokemonContext.Provider>
	)
}

export default GamePage
