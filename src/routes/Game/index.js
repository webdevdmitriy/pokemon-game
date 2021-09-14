const GamePage = ({ onChangePage }) => {
	const handleClickButton = page => {
		onChangePage && onChangePage('home')
	}
	return (
		<div className=''>
			<p>game page!11!1</p>
			<button onClick={handleClickButton}>Домооооооой</button>
		</div>
	)
}

export default GamePage
