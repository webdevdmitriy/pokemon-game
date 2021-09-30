import Header from '../../components/Header'
import Layout from '../../components/Layout'
import Footer from '../../components/Footer'
import PokemonCard from '../../components/PokemonCard'
import { useDispatch, useSelector } from 'react-redux'

import BackGround from '../../assets/bg1.jpg'

import s from './style.module.css'

import POKEMONS from '../../assets/pokemons.json'
import MenuHeader from '../../components/MenuHeader'
import { plusAction, selectCount } from '../../store/counter'

function HomePage({ onChangePage }) {
	const count = useSelector(selectCount)
	const dispatch = useDispatch()

	console.log('count', count)

	const handleClickButton = page => {
		// onChangePage && onChangePage(page)
		dispatch(plusAction(1))
		console.log('count', count)
	}
	return (
		<>
			<MenuHeader />
			<Header title='This is title' descr='This is Description!' onClickButton={handleClickButton} />

			<Layout title='This is title!' descr='This is Description!' urlBg={BackGround}>
				<p>
					In the game two players face off against one another, one side playing as "blue", the other as "red" on a 3x3
					grid. Each player has five cards in a hand and the aim is to capture the opponent's cards by turning them into
					the player's own color of red or blue. To win, a majority of the total ten cards played (including the one
					card that is not placed on the board) must be of the player's card color. To do this, the player must capture
					cards by placing a card adjacent to an opponent's card whereupon the 'ranks' of the sides where the two cards
					touch will be compared. If the rank of the opponent's card is higher than the player's card, the player's card
					will be captured and turned into the opponent's color. If the player's rank is higher, the opponent's card
					will be captured and changed into the player's color instead.
				</p>
			</Layout>
			<Layout title='This is title' descr='This is Description!' colorBg='blue'>
				<div className={s.flex}>
					{POKEMONS.map(item => (
						<PokemonCard
							key={item.id}
							name={item.name}
							img={item.img}
							id={item.id}
							type={item.type}
							values={item.values}
						/>
					))}
				</div>
			</Layout>
			<Layout title='This is title' descr='This is Description!' urlBg={BackGround} />
			<Footer />
		</>
	)
}

export default HomePage
