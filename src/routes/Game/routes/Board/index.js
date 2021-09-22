import { useContext } from 'react'
import { useHistory } from 'react-router'
import { useEffect } from 'react/cjs/react.development'

import PokemonCard from '../../../../components/PokemonCard'
import { PokemonContext } from '../../../../context/PokemonContext'
import s from './style.module.css'

const BoardPage = () => {
	const [board, setBoard] = useState([])
	const { pokemon } = useContext(PokemonContext)
	const history = useHistory()

	// if (Object.keys(pokemons).length === 0) {
	// 	history.replace('/game')
	// }
	useEffect(async () => {
		const boardResponce = await fetch('https://reactmarathon-api.netlify.app/api/board')
		const boardRequest = await boardResponce.json()

		setBoard(boardRequest.data)
	}, [])

	const handleClickBoardPlate = position => {}
	return (
		<div className={s.root}>
			<div className={s.playerOne}>
				{Object.values(pokemon).map(({ id, name, img, type, values }) => (
					<PokemonCard
						className={s.card}
						key={id}
						name={name}
						img={img}
						id={id}
						type={type}
						values={values}
						isActive={true}
					/>
				))}
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
		</div>
	)
}

export default BoardPage
