import { useContext, useState } from 'react'
import { useHistory } from 'react-router'
import { useEffect } from 'react/cjs/react.development'

import PokemonCard from '../../../../components/PokemonCard'
import { PokemonContext } from '../../../../context/PokemonContext'
import PlayerBoard from './component/PlayerBoard'

import s from './style.module.css'
import { useDispatch, useSelector } from 'react-redux'

import { selectPokemonsSelectedData } from '../../../../store/pokemonsPlayer1'
import { setPokemons2 } from '../../../../store/pokemonsPlayer2'

const counterWin = (board, player1, player2) => {
	let player1Count = player1.length
	let player2Count = player2.length

	board.forEach(item => {
		if (item.card.possession === 'red') {
			player2Count++
		}
		if (item.card.possession === 'blue') {
			player1Count++
		}
	})
	return [player1Count, player2Count]
}

const BoardPage = () => {
	const [result, setResult] = useState(null)

	const pokemons1Redux = useSelector(selectPokemonsSelectedData)
	console.log(pokemons1Redux)

	const [board, setBoard] = useState([])
	const [Player1, setPlayer1] = useState(() => {
		return Object.values(pokemons1Redux).map(item => ({
			...item,
			possession: 'blue'
		}))
	})
	const [Player2, setPlayer2] = useState([])
	const [choiceCard, setChoiceCard] = useState(null)
	const [steps, setSteps] = useState(0)

	const history = useHistory()

	const dispatch = useDispatch()

	if (Object.keys(pokemons1Redux).length === 0) {
		history.replace('/game')
	}

	useEffect(async () => {
		const boardResponce = await fetch('https://reactmarathon-api.netlify.app/api/board')
		const boardRequest = await boardResponce.json()

		setBoard(boardRequest.data)

		const Player2Responce = await fetch('https://reactmarathon-api.netlify.app/api/create-player')
		const Player2Request = await Player2Responce.json()

		// setPokemonPlayer2(Player2Request.data)
		dispatch(setPokemons2(Player2Request.data))

		setPlayer2(() => {
			return Player2Request.data.map(item => ({
				...item,
				possession: 'red'
			}))
		})
	}, [])

	const handleClickBoardPlate = async position => {
		if (choiceCard) {
			const params = {
				position,
				card: choiceCard,
				board
			}

			const res = await fetch('https://reactmarathon-api.netlify.app/api/players-turn', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(params)
			})

			const request = await res.json()

			if (choiceCard.player === 1) {
				setPlayer1(prevState => prevState.filter(item => item.id !== choiceCard.id))
			}
			if (choiceCard.player === 2) {
				setPlayer2(prevState => prevState.filter(item => item.id !== choiceCard.id))
			}

			setBoard(request.data)
			setSteps(prevState => {
				const count = prevState + 1
				return count
			})
		}
	}
	useEffect(() => {
		if (steps === 9) {
			const [count1, count2] = counterWin(board, Player1, Player2)

			if (count1 > count2) {
				setResult('WIN')
				alert('WIN')
				history.replace('/game/finish')
			} else if (count1 < count2) {
				alert('LOSE')
				history.replace('/game/finish')
			} else {
				alert('DRAW')
				history.replace('/game/finish')
			}
		}
	}, [steps])

	return (
		<div className={s.root}>
			<div className={s.playerOne}>
				{<PlayerBoard player={1} cards={Player1} onClickCard={card => setChoiceCard(card)} />}
			</div>
			<div className={s.board}>
				{board.map(item => (
					<div
						key={item.position}
						className={s.boardPlate}
						onClick={() => !item.card && handleClickBoardPlate(item.position)}
					>
						{item.card && <PokemonCard {...item.card} isActive minimize />}
					</div>
				))}
			</div>
			<div className={s.playerTwo}>
				{<PlayerBoard player={2} cards={Player2} onClickCard={card => setChoiceCard(card)} />}
			</div>
		</div>
	)
}

export default BoardPage
