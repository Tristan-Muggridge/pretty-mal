import { FormEvent, useState } from 'react'

import Anime from './types/Anime';
import IMALSearchResult from './types/IMALSearchResult'

const headers = {'Content-Type': 'application/json'};

const AnimeCard = ({anime}: {anime: Anime}) => {
	return (
		<div className='anime-card'>
				{<img src={anime.main_picture.medium} alt="" />}
				<h3> {anime.title} </h3>
				<div className='card-genres'>
				{
					anime.genres && anime.genres.map( genre => <span key={`${anime.id}-${genre.id}`}> {genre.name} </span>)
				}
				</div>
		</div>
)}

function App() {

	const [search, setSearch] = useState('')
	const [results, setResults] = useState<IMALSearchResult[]>([]);

	function sortBy <T>(arr: T[], category: keyof T): T[] {
		return arr.sort( (a, b) => {
			if (a[category] > b[category]) return -1
			if (a[category] < b[category]) return 1
			return 0
		})
	}

	const searchMAL = async (e: FormEvent) => {
		e.preventDefault()

		const request = await fetch(`http://localhost:3000/season`, {
			method: 'post', 
			body: JSON.stringify({year: 2023, season: "winter"}), 
			headers: headers
		})

		const json = await request.json();

		const {data, error, isLoading} = json;

		if (error) console.error(error);
		if (isLoading) console.log('Loading...');

		setResults( () => data.map( (result: {node: IMALSearchResult}) => new Anime(result.node)));
	}

	return (<>
		<header>
			<nav>
				<ul>

			</nav>
		</header>

		<main>

			<form onSubmit={searchMAL}>
				<label htmlFor="search"></label>
				<input id="search" type="text" value={search} onChange={e => setSearch(e.target.value)} />
			</form>

			<section className='search-results'>

			{/* Map through the results and display them */}
			{
				results.map( (result: any) => <AnimeCard anime={new Anime(result)} />	)
			}

			</section>
		</main>
	</>)
}

export default App
