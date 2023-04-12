import { useState } from 'react'
import { FaList, FaUser, FaStar, FaPlay } from 'react-icons/fa'

import Card from './Card';
import useAnime from './hooks/useAnime';

import Anime from './types/Anime';
import { getSeason } from './types/Seasons';
import sortBy from './util/sortBy';

function App() {
	const [activeGenres, setActiveGenres] = useState<string[]>([]);
	
	const [inactiveGenres, setInactiveGenres] = useState<string[]>([
		"Action", "Adventure", "Avant Garde", "Boys Love",
		"Comedy", "Drama", "Fantasy", "Girls Love",
		"Gourmet", "Horror", "Mystery", "Romance",
		"Sci-Fi", "Slice of Life", "Sports", "Supernatural",
		"Suspense",  
	]);

	const activateGenre = (index: number) => {
		const genre = inactiveGenres.slice(index, index+1)[0];
		setInactiveGenres([...inactiveGenres.slice(0, index), ...inactiveGenres.slice(index+1, inactiveGenres.length)]);
		setActiveGenres([...activeGenres, genre])
	}

	const deactivateGenre = (index: number) => {
		const genre = activeGenres.slice(index, index+1)[0];
		setActiveGenres([...activeGenres.slice(0, index), ...activeGenres.slice(index+1, activeGenres.length)]);
		setInactiveGenres([...inactiveGenres, genre])
	}

	return (<>
		<header>
			<nav className='desktop-nav'>
				<i className='nav-title'>OurAnimeList</i>
				<ul className='nav-shortcuts'>
					<li>Home</li>
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
					{/* <div className='genre-filters'>
						<h3> Genres </h3>
						<div>
							<div className='pane'>
							{
								activeGenres.map( (genre, index) => <button onClick={()=>deactivateGenre(index)} className='toggled'> {genre} </button>)
							}
							</div>
							<div className='pane'>
							{
								inactiveGenres.map( (genre, index) => <button onClick={()=>activateGenre(index)} className='untoggled'> {genre} </button>)
							}
							</div>
						</div>
					</div> */}

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

						<div className='pane'>
							<div>
								<h4> sike!</h4>
								<p>  
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Non accusantium nulla aliquam asperiores iure deserunt eum, earum harum ipsum repellat optio quod quo quas consectetur nam minima sequi fuga cupiditate.
								</p>
							</div>
						</div>
					</div>
				</aside>

				<div className="content">
					<SectionHeader heading={"Continue Watching"}/>
					<section className='continue-watching even-columns'>
						<div className="card">
							<div className="anime-card">
								<img className="anime-poster" src="https://api-cdn.myanimelist.net/images/anime/1160/122627l.jpg" alt="" />
							<div className="anime-card-content">
								<div className="play-button"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></div><h4 className="title"> Kaguya-sama: Love is War - Ultra Romantic </h4><span className="rating"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg> 9.06 </span>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="anime-card">
								<img className="anime-poster" src="https://api-cdn.myanimelist.net/images/anime/1279/131078l.jpg" alt="" />
							<div className="anime-card-content">
								<div className="play-button"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1rem" width="1rem" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></div><h4 className="title"> Attack on Titan: Final Season - The Final Chapters </h4><span className="rating"> <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path></svg> 9.12 </span>
								</div>
							</div>
						</div>
					</section>

					<SectionHeader heading={"Current Simulcasts"}/>
					<section className='even-columns'>
					{
						SeasonalAnime()
					}
					</section>
					
					<SectionHeader heading={"Top Anime of All Time"}/>

					<section className='even-columns'>
					{	
						TopAnime()
					}
					</section>
				</div>
			</div>

		</main>
	</>)
}

export default App

const SectionHeader = ({heading}: {heading: string}) => {

	return (
		<div className='section-header'>
			<h2> {heading} </h2>
			<a> See More... </a>
		</div>
	)

}

const AnimeCard = ({anime, ref}: {anime: Anime, ref?: any}) => {	
	return (
		<Card>
			<div className='anime-card'>
				<img className='anime-poster' src={anime.main_picture.large} alt="" />	
				<div className='anime-card-content'>
					<a href={`${anime.id}`} className='play-button'><FaPlay size={"1rem"}/></a>
					<h4 className='title'> {!anime.alternative_titles.en ? anime.title : anime.alternative_titles.en} </h4>
					<span className='rating'> <FaStar size={20} /> {anime.mean} </span>
				</div>
			</div>
		</Card>
)}

const SeasonalAnime = () => {
	const today = new Date();
	const seasonalAnime = useAnime( `http://localhost:8080/${today.getFullYear()}/${getSeason(today.getMonth()+1)}?preview=true` );

	return (
		<>
			{
				seasonalAnime.map( (anime: Anime) => <AnimeCard anime={anime} key={'seasonal-'+anime.id} /> )
			}
		</>
	)
}

const TopAnime = () => {
	const topAnime = sortBy(useAnime( `http://localhost:8080/anime/top?preview=true` ), 'rank', 'desc');
	return (
		<>
		{
			topAnime.map( (anime: Anime) => <AnimeCard anime={anime} key={anime.id} /> )
		}
		</>
	)
	

}