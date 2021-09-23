import { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { useEffect } from 'react/cjs/react.development'

import PokemonCard from '../../../../components/PokemonCard'
import { PokemonContext } from '../../../../context/PokemonContext'
import PlayerBoard from './component/PlayerBoard'
import s from './style.module.css'

const BoardPage = () => {
	const [board, setBoard] = useState([])
	const [Player2, setPlayer2] = useState([])
	const [choiceCard, setChoiceCard] = useState(null)

	const { pokemon } = useContext(PokemonContext)
	const history = useHistory()

	// if (Object.keys(pokemons).length === 0) {
	// 	history.replace('/game')
	// }

	console.log(Player2)
	useEffect(async () => {
		const boardResponce = await fetch('https://reactmarathon-api.netlify.app/api/board')
		const boardRequest = await boardResponce.json()

		setBoard(boardRequest.data)

		const Player2Responce = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
		const Player2Request = await Player2Responce.json()

		setPlayer2(Player2Request.data)
	}, [])

	const handleClickBoardPlate = position => {}
	return (
		<div className={s.root}>
			<div className={s.playerOne}>
				{<PlayerBoard cards={Object.values(pokemon)} onClickCard={card => setChoiceCard(card)} />}
			</div>
			<div className={s.board}>
				{board.map(item => (
					<div
						key={item.position}
						className={s.boardPlate}
						onClick={() => !item.card && handleClickBoardPlate(item.position)}
					>
						{item.card && <PokemonCard {...item} minimize />}
					</div>
				))}
			</div>
			<div className={s.playerTwo}>{<PlayerBoard cards={Player2} onClickCard={card => setChoiceCard(card)} />}</div>
		</div>
	)
}

export default BoardPage
