import { FormEvent, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaList, FaUser, FaStar } from 'react-icons/fa'

import Card from './Card';
import useAnime from './hooks/useAnime';

import Anime from './types/Anime';
import { getSeason } from './types/Seasons';
import sortBy from './util/sortBy';
import useManga from './hooks/useManga';
import Manga from './types/Manga';

const AnimeCard = ({anime, ref}: {anime: Anime, ref?: any}) => {	
	return (
		<Card>
			<img src={anime.main_picture.large} alt="" />
			
			<div className='card-content'>
				<span><FaStar className='stars'/> {anime.mean} </span>
				<h4> {anime.title.slice(0,20)}{anime.title.length > 21 ? '...': ''} </h4>
			</div>

			<button className='interactable btn-dark'> Playing On </button>
			<button className='interactable transparent btn-light'> Details </button>
		</Card>
)}

const MangaCard = ({manga, ref}: {manga: Manga, ref?: any}) => {
	return (
		<Card>
			<div className='card-content'>
				<img src={manga.main_picture.large} alt="" />
				<h4> {manga.title} </h4>
			</div>
		</Card>
	)
}

let interval: number | null;

function App() {
	
	const seasonalAnime = sortBy(useAnime(`http://localhost:8080/2023/spring`), 'rank');
	const topManga = useManga(`http://localhost:8080/manga/top`);
	
	const seasonalAnimeRef = useRef<HTMLDivElement>(null);
	const topMangaRef = useRef<HTMLDivElement>(null);


	function scrollHorizontal(current: HTMLDivElement | null, direction: 'left' | 'right'): void {
		if (!current) return
		if (!interval) {
			interval = setInterval( () => {
				console.debug("scrolling", interval)
				current.scrollLeft +=  direction == 'right' ? 500 : -500;
			}, 100)		
		}
	}

	function handleClickRelease() {
		if (!interval) return;
		clearInterval(interval);
		interval = null;
	}

	return (<>
		<header>
			<nav>
				<i className='nav-title'>OurAnimeList</i>
				<div>
					<ul className='nav-shortcuts'>
						<li className='active'>Movies</li>
						<li>Shows</li>
						<li>Manga</li>
					</ul>
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
					<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onMouseDown={() => scrollHorizontal(seasonalAnimeRef.current, 'left')}> <FaChevronLeft /> </button>
					<div className='scroll-horizontal' ref={seasonalAnimeRef} style={{ scrollSnapAlign: 'start' }}>	
						{ seasonalAnime.map( (anime: Anime) => <AnimeCard anime={anime} key={anime.id} /> ) }
					</div>
					<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onMouseDown={() => scrollHorizontal(seasonalAnimeRef.current, 'right')}> <FaChevronRight /> </button>
				</div>
			</section>

			{/* Seasonal Manga Preview */}
			<section>
				<h3 className='border-bottom'> Top Manga </h3>
				<h5> Top Manga According to MAL Users:</h5>
				<div className='row'>
					<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onClick={() => scrollHorizontal(topMangaRef.current, 'left')}> <FaChevronLeft /> </button>
					<div className='scroll-horizontal' ref={topMangaRef}>	
						{ topManga && sortBy(topManga, 'rank').map( (manga: Manga) => <MangaCard manga={manga} key={manga.id} /> ) }
					</div>
					<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onClick={() => scrollHorizontal(topMangaRef.current, 'right')}> <FaChevronRight /> </button>
				</div>
			</section>
		</main>
	</>)
}

export default App
