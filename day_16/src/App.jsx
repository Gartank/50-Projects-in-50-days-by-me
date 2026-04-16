import { useState } from 'react'
import Jumbotron from './components/jumbotron.jsx';
import Sidebar from './components/sidebar.jsx';
import Searchbar from './components/searchbar.jsx';
import Catalog from './components/catalog.jsx';


import './App.css'

const Header = () => {
	return (
		<header>
			<Sidebar />
			<Searchbar />
		</header>
	)
}

const Main = () => {
	return (
		<main>
			<Jumbotron />
			<Catalog />
		</main>
	)
}

function App() {

	return (
	<>
		<Header />
		<Main />
	</>
	)
}

export default App
