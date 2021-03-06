import { PokemonContext } from '../../context/PokemonContext'
import { Switch, Route, useRouteMatch } from 'react-router-dom'
import { useState } from 'react'
import StartPage from './routes/Start'
import BoardPage from './routes/Board'
import FinishPage from './routes/Finish'

const GamePage = () => {
	const match = useRouteMatch()
	const [selectedPokemons, setSelectedPokemons] = useState({})

	const [result, setResult] = useState(null)

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

	return (
		<Switch>
			<Route path={`${match.path}/`} exact component={StartPage} />
			<Route path={`${match.path}/board`} component={BoardPage} />
			<Route path={`${match.path}/finish`} component={FinishPage} />
		</Switch>
	)
}

export default GamePage
