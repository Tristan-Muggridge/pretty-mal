import { FormEvent, useRef, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaList, FaUser, FaStar, FaSearch, FaPlay } from 'react-icons/fa'

import Card from './Card';
import useAnime from './hooks/useAnime';

import Anime from './types/Anime';
import { getSeason } from './types/Seasons';
import sortBy from './util/sortBy';
import useManga from './hooks/useManga';
import Manga from './types/Manga';

function App() {
	const anime = useAnime( `http://localhost:8080/2023/spring` );
	// const [activeGenres, setActiveGenres] = useState<string[]>([]);
	
	// const [inactiveGenres, setInactiveGenres] = useState<string[]>([
	// 	"Action", "Adventure", "Avant Garde", "Boys Love",
	// 	"Comedy", "Drama", "Fantasy", "Girls Love",
	// 	"Gourmet", "Horror", "Mystery", "Romance",
	// 	"Sci-Fi", "Slice of Life", "Sports", "Supernatural",
	// 	"Suspense",  
	// ]);

	// const activateGenre = (index: number) => {
	// 	const genre = inactiveGenres.slice(index, index+1)[0];
	// 	setInactiveGenres([...inactiveGenres]);
	// 	setActiveGenres([...activeGenres, genre])
	// 	console.debug(genre);
	// }

	// const deactivateGenre = (index: number) => {
	// 	const genre = activeGenres.slice(index, index+1)[0];
	// 	setActiveGenres([...activeGenres]);
	// 	setInactiveGenres([...inactiveGenres, genre])
	// 	console.debug(genre);
	// }

	return (<>
		<header>
			<nav className='desktop-nav'>
				<i className='nav-title'>OurAnimeList</i>
				<ul className='nav-shortcuts'>
					<li>Movies</li>
					<li>Shows</li>
					<li>Manga</li>
				</ul>
				<div className='nav-user'>
					<FaList />
					Username
					<FaUser /> 
				</div>
			</nav>
		</header>

		<main>
			
			<div className="layout">

				<aside>
					<div className='news'>
						<h3> News </h3>
						<div className='pane'>
							<div>
								<h4> Your favourite anime got a new season!</h4>
								<p>  
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium nulla aliquam asperiores iure deserunt eum, earum harum ipsum repellat optio quod quo quas consectetur nam minima sequi fuga cupiditate.
								</p>
							</div>
						</div>
					</div>

					<div className='genre-filters'>
						<h3> Genres </h3>
						{/* <div>
							<div className='pane active-genres'>
							{
								activeGenres.map( (genre, index) => <button onClick={()=>deactivateGenre(index)} className='genre-button'> {genre} </button>)
							}
							</div>
							<div className='pane inactive-genres'>
							{
								inactiveGenres.map( (genre, index) => <button onClick={()=>activateGenre(index)} className='genre-button'> {genre} </button>)
							}
							</div>
						</div> */}
					</div>
				</aside>

				<div className="content">
					<h2> Continue Watching </h2>

					<h2> Top Anime of All Time </h2>
					<section className='continue-watching even-columns'>
					{	
						anime.map( (anime: Anime) => <AnimeCard anime={anime} key={anime.id} /> )
					}
					</section>
				</div>
			</div>

		</main>
	</>)
}

export default App

// const cuttingRoom = () => {
// 		{/* Seasonal Anime Preview */}
// 		<section>
// 			<h3 className='border-bottom'> { `${getSeason( new Date().getMonth() )} ${new Date().getFullYear()} Anime` } </h3>
// 			<h5> Simulcast airing right now:</h5>
// 			<div className='row'>
// 				<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onMouseDown={() => scrollHorizontal(seasonalAnimeRef.current, 'left')}> <FaChevronLeft /> </button>
// 				<div className='scroll-horizontal' ref={seasonalAnimeRef} style={{ scrollSnapAlign: 'start' }}>	
// 					{ seasonalAnime.map( (anime: Anime) => <AnimeCard anime={anime} key={anime.id} /> ) }
// 				</div>
// 				<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onMouseDown={() => scrollHorizontal(seasonalAnimeRef.current, 'right')}> <FaChevronRight /> </button>
// 			</div>
// 		</section>

// 		{/* Seasonal Manga Preview */}
// 		<section>
// 			<h3 className='border-bottom'> Top Manga </h3>
// 			<h5> Top Manga According to MAL Users:</h5>
// 			<div className='row'>
// 				<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onClick={() => scrollHorizontal(topMangaRef.current, 'left')}> <FaChevronLeft /> </button>
// 				<div className='scroll-horizontal' ref={topMangaRef}>	
// 					{ topManga && sortBy(topManga, 'rank').map( (manga: Manga) => <MangaCard manga={manga} key={manga.id} /> ) }
// 				</div>
// 				<button tabIndex={0} className='scroll-button interactable' onMouseUp={handleClickRelease} onClick={() => scrollHorizontal(topMangaRef.current, 'right')}> <FaChevronRight /> </button>
// 			</div>
// 		</section>

const AnimeCard = ({anime, ref}: {anime: Anime, ref?: any}) => {	
	return (
		<Card>
			<div className='anime-card'>
				<img className='anime-poster' src={anime.main_picture.large} alt="" />	
				<div className='anime-card-content'>
					<div className='play-button'><FaPlay size={"1rem"}/></div>
					<h4 className='title'> {!anime.alternative_titles.en ? anime.title : anime.alternative_titles.en} </h4>
					<span className='rating'> <FaStar size={20} /> {anime.mean} </span>
				</div>
			</div>
		</Card>
)}

// const MangaCard = ({manga, ref}: {manga: Manga, ref?: any}) => {
// 	return (
// 		<Card>
// 			<div className='card-content'>
// 				<img src={manga.main_picture.large} alt="" />
// 				<h4> {manga.title} </h4>
// 			</div>
// 		</Card>
// 	)
// }

// const seasonalAnime = sortBy(useAnime(`http://localhost:8080/2023/spring`), 'rank');
// const topManga = useManga(`http://localhost:8080/manga/top`);

// const seasonalAnimeRef = useRef<HTMLDivElement>(null);
// const topMangaRef = useRef<HTMLDivElement>(null);


// function scrollHorizontal(current: HTMLDivElement | null, direction: 'left' | 'right'): void {
// 	if (!current) return
// 	if (!interval) {
// 		interval = setInterval( () => {
// 			console.debug("scrolling", interval)
// 			current.scrollLeft +=  direction == 'right' ? 500 : -500;
// 		}, 100)		
// 	}
// }

// function handleClickRelease() {
// 	if (!interval) return;
// 	clearInterval(interval);
// 	interval = null;
// }


// }