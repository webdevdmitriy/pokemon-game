import logo from './logo.svg'
import './App.css'
import Header from './components/Header'
import Layout from './components/Layout'
import Footer from './components/Footer'

import BackGround from './assets/bg1.jpg'

function App() {
	return (
		<>
			<Header title='This is title' descr='This is Description!' />
			<Layout title='This is title' descr='This is Description!' urlBg={BackGround} />
			<Layout title='This is title' descr='This is Description!' colorBg='blue' />
			<Layout title='This is title' descr='This is Description!' urlBg={BackGround} />
			<Footer />
		</>
	)
}

export default App
