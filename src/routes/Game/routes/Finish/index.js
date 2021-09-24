import { useHistory } from 'react-router'
import { useContext, useEffect, useState } from 'react'

import { PokemonContext } from '../../../../context/PokemonContext'
import PokemonCard from '../../../../components/PokemonCard'

import s from './style.module.css'

const FinishPage = () => {
	const { pokemon, pokemonPlayer2 } = useContext(PokemonContext)
	const history = useHistory()

	if (pokemonPlayer2.length === 0) {
		history.replace('/game')
	}

	const handleClickEndButton = () => {
		history.push('/game')
	}

	return (
		<div>
			<div className={s.root}>
				<div className={s.playerOne}>
					{Object.values(pokemon).map(item => (
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

				<button className={s.button} type='button' onClick={handleClickEndButton}>
					END GAME
				</button>

				<div className={s.playerTwo}>
					{pokemonPlayer2.map(item => (
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
			</div>
		</div>
	)
}

export default FinishPage
