import { useState, useEffect, useContext } from 'react'

import PokemonCard from '../../components/PokemonCard'
import Layout from '../../components/Layout'

import { FireBaseContext } from '../../context/firebaseContext'

import s from './style.module.css'

const GamePage = () => {
	const fireBase = useContext(FireBaseContext)
	console.log(fireBase)

	const [pokemons, setPOKEMONS] = useState({})

	useEffect(() => {
		fireBase.getPokemonSocket(pokemons => {
			setPOKEMONS(pokemons)
		})
	}, [])

	const handleCardClick = id => {
		setPOKEMONS(prevState => {
			return Object.entries(prevState).reduce((acc, item) => {
				const pokemon = { ...item[1] }
				if (pokemon.id === id) {
					pokemon.active = !pokemon.active
				}

				acc[item[0]] = pokemon

				fireBase.postPokemon(item[0], pokemon)

				return acc
			}, {})
		})
	}

	const addPokemon = () => {
		const data = {
			abilities: ['keen-eye', 'tangled-feet', 'big-pecks'],
			stats: {
				hp: 63,
				attack: 60,
				defense: 55,
				'special-attack': 50,
				'special-defense': 50,
				speed: 71
			},
			type: 'flying',
			img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png',
			name: 'pidgeotto',
			base_experience: 122,
			height: 11,
			id: 25,
			values: {
				top: 'A',
				right: 2,
				bottom: 7,
				left: 5
			}
		}
		fireBase.addPokemon(data)
	}

	return (
		<Layout title='This is title' descr='This is Description!' colorBg='blue'>
			<button
				style={{
					display: 'block',
					margin: '0 auto'
				}}
				onClick={addPokemon}
			>
				Add new pokemon
			</button>
			<div className={s.flex}>
				{Object.entries(pokemons).map(([key, item]) => (
					<PokemonCard
						key={key}
						name={item.name}
						img={item.img}
						id={item.id}
						type={item.type}
						values={item.values}
						isActive={item.active}
						onCardClick={() => handleCardClick(item.id)}
					/>
				))}
			</div>
		</Layout>
	)
}

export default GamePage
