import { FormEvent, useEffect, useState } from 'react'

const headers = {'Content-Type': 'application/json'};

enum Type {
	MOVIE = 'movie',
	TV = 'tv'
}

enum Seasons {
	"spring" = "Spring",
	"summer" = "Summer",
	"fall" = "Fall",
	"winter" = "Winter"
}

interface IMain_Picture {
	large: string;
	medium: string;
}

interface IAlternative_Titles {
	synonyms: string[];
	en: string;
	ja: string;
}

interface IGenre {
	id: number;
	name: string;
}

interface IBroadcast {
	day_of_the_week: string;
	start_time: string;
}

interface IStudio {
	id: number;
	name: string;
}

interface IMALSearchResult {
	id: number,
	title: string,
	main_picture: IMain_Picture,
	alternative_titles: IAlternative_Titles,
	start_date: string,
	end_date: string,
	synopsis: string,
	mean: number,
	rank: number,
	popularity: number,
	num_list_users: number,
	num_scoring_users: number,
	nsfw: string,
	created_at: string,
	updated_at: string,
	media_type: string,
	status: string,
	genres: IGenre[],
	my_list_status: string,
	num_episodes: number,
	start_season: string,
	broadcast: IBroadcast,
	source: string,
	average_episode_duration: number,
	rating: string,
	// pictures: any,
	// background: any,
	// related_anime,
	// related_manga,
	// recommendations,
	studios: IStudio,
	// statistics
}

class Anime {
	id: number;
	title: string;
	alternativeTitles: IAlternative_Titles;
	
	posterURL: IMain_Picture;
	genres: IGenre[];
	synopsis: string;
	score: number;
	
	duration: number;
	episodeCount: number;
	
	studios: IStudio;
	
	rank: number;
	nsfw: string;
	source: string;

	constructor(data: IMALSearchResult) {		
		this.id = data.id;
		this.title = data.title;
		this.alternativeTitles = data.alternative_titles ?? [];
		this.posterURL = data.main_picture;
		this.genres = data.genres;
		this.synopsis = data.synopsis;
		this.score = data.mean;
		this.duration = data.average_episode_duration;
		this.episodeCount = data.num_episodes;
		this.studios = data.studios;
		this.rank = data.rank;
		this.nsfw = data.nsfw;
		this.source = data.source;
	}

}

const AnimeCard = ({anime}: {anime: Anime}) => {
	return (
		<div className='anime-card'>
				{ anime.posterURL && <img src={`https://image.tmdb.org/t/p/w500/${anime.posterURL}`} alt="" />}
				<h3> {anime.title} </h3>
				<div className='providers'>
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
		console.debug(results)
	}

	return (
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
	)
}

export default App
