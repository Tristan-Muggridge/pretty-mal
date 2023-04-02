import { FormEvent, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaList, FaUser, FaStar } from 'react-icons/fa'

import Card from './Card';
import useAnime from './hooks/useAnime';

import Anime from './types/Anime';
import IMALSearchResult from './types/IMALSearchResult'
import { getSeason } from './types/Seasons';
import sortBy from './util/sortBy';

const headers = {'Content-Type': 'application/json'};

const AnimeCard = ({anime}: {anime: Anime}) => {
	return (
		<Card>
			<img src={anime.main_picture.large} alt="" />
			
			<div className='card-content'>
				<span><FaStar className='stars'/> {anime.score} </span>
				<h4> {anime.title.slice(0,20)}{anime.title.length > 21 ? '...': ''} </h4>
			</div>

			<button className='interactable btn-dark'> Playing On </button>
			<button className='interactable transparent btn-light'> Details </button>
		</Card>
)}

function App() {
	const [results, setResults] = useState<IMALSearchResult[]>([]);	
	const seasonalAnime = useAnime(`http://localhost:8080/2023/spring`);
	const topManga = useAnime(`http://localhost:8080/manga/top`);
	const seasonalAnimeRef = useRef<HTMLDivElement>(null);
	const topMangaRef = useRef<HTMLDivElement>(null);

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

	function scrollLeft(ref: HTMLDivElement | null, direction: 'left' | 'right') {
		if (!ref) return;
		direction === 'right' 
			? ref.scrollLeft += 1000 
			: ref.scrollLeft -= 1000;
	}

	return (<>
		<header>
			<nav>
				<i>OurAnimeList</i>
				<div>
					<FaList />
					Username
					<FaUser /> 
				</div>
			</nav>
		</header>

		<main>
			{/* Seasonal Anime Preview */}
			<section>
				<h3 className='border-bottom'> { `${getSeason( new Date().getMonth() )} ${new Date().getFullYear()} Anime` } </h3>
				<h5> Simulcast airing right now:</h5>
				<div className='row'>
					<button tabIndex={0} className='scroll-button interactable' onClick={() => scrollLeft(seasonalAnimeRef.current, 'left')}> <FaChevronLeft /> </button>
					<div className='scroll-horizontal' ref={seasonalAnimeRef}>	
						{ seasonalAnime && sortBy(seasonalAnime, 'rank').map( (anime: Anime) => <AnimeCard anime={anime} key={anime.id} /> ) }
					</div>
					<button tabIndex={0} className='scroll-button interactable' onClick={() => scrollLeft(seasonalAnimeRef.current, 'right')}> <FaChevronRight /> </button>
				</div>
			</section>

			{/* Seasonal Manga Preview */}
			<section>
				<h3 className='border-bottom'> { `Top Manga According to MAL Users` } </h3>
				<h5> Top Manga of All Time:</h5>
				<div className='row'>
					<button tabIndex={0} className='scroll-button interactable' onClick={() => scrollLeft(topMangaRef.current, 'left')}> <FaChevronLeft /> </button>
					<div className='scroll-horizontal' ref={topMangaRef}>	
						{ topManga && sortBy(topManga, 'rank').map( (manga: Anime) => <AnimeCard anime={manga} key={manga.id} /> ) }
					</div>
					<button tabIndex={0} className='scroll-button interactable' onClick={() => scrollLeft(topMangaRef.current, 'right')}> <FaChevronRight /> </button>
				</div>
			</section>
		</main>
	</>)
}

export default App
