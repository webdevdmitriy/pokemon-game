import { useState } from 'react'

import PokemonCard from '../../components/PokemonCard'
import Layout from '../../components/Layout'
import POKEMONS from '../../assets/pokemons.json'

import s from './style.module.css'

const GamePage = () => {
	const [pokemons, setPOKEMONS] = useState(POKEMONS)

	const handleCardClick = id => {
		setPOKEMONS(prevState => {
			const mas = [...prevState].map(card => {
				if (card.id === id) {
					card = {
						...card,
						isActive: !card.isActive
					}
				}
				return card
			})
			return mas
		})
	}
	return (
		<Layout title='This is title' descr='This is Description!' colorBg='blue'>
			<div className={s.flex}>
				{pokemons.map(item => (
					<PokemonCard
						key={item.id}
						name={item.name}
						img={item.img}
						id={item.id}
						type={item.type}
						values={item.values}
						isActive={item.isActive}
						onCardClick={() => handleCardClick(item.id)}
					/>
				))}
			</div>
		</Layout>
	)
}

export default GamePage
