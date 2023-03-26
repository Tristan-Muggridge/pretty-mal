import { useEffect, useState } from 'react'

enum Type {
	MOVIE = 'movie',
	TV = 'tv'
}

interface ISearchResult {
	id: string
	title: string
	name: string
	original_title: string
	original_name: string
	poster_path: string
	backdrop_path: string
	first_air_date: string
	overview: string
	media_type: Type
	adult: boolean
	genre_ids: number[]
	vote_average: number
	vote_count: number
	popularity: number
}

class Anime {
	id: string
	title: string
	originalTitle: string
	
	posterURL: string
	backdropURL: string

	releaseDate: string
	overview: string

	type: Type
	adult: boolean
	genres: number[]
	
	voteAverage: number
	voteCount: number
	popularity: number

	constructor(json: ISearchResult) {
		this.id = json['id'] ?? undefined
		this.title = json['title'] ?? json["name"] ?? undefined ?? undefined
		this.originalTitle = json['original_title'] ?? json["original_name"] ?? undefined

		this.posterURL = json['poster_path'] ?? undefined
		this.backdropURL = json['backdrop_path'] ?? undefined

		this.releaseDate = json['first_air_date'] ?? undefined
		this.overview = json['overview'] ?? undefined

		this.type = json['media_type'] ?? undefined
		this.adult = json['adult'] ?? undefined
		this.genres = json['genre_ids'] ?? undefined

		this.voteAverage = json['vote_average'] ?? undefined
		this.voteCount = json['vote_count'] ?? undefined
		this.popularity = json['popularity'] ?? undefined
	}
}

const AnimeCard = ({anime}: {anime: Anime}) => {
	return (<div className='anime-card'>
		<img src={`https://image.tmdb.org/t/p/w500/${anime.posterURL}`} alt="" />
		<h4> {anime.title} </h4>
	</div>)
}

function App() {

	const [search, setSearch] = useState('Naruto')
	const [results, setResults] = useState<ISearchResult[]>([]);

	// send a request on page load and set the results to the json response
	useEffect(() => {
		fetch(`http://localhost:3000/search/${search}`).then( data => {
			data.json().then( data => {
				setResults(data.results as ISearchResult[])
			})
		})
	})

	return (
		<main>
			<section>

			{/* Map through the results and display them */}
			{
				results.map( (result: any) => <AnimeCard anime={new Anime(result)} />	)
			}

			</section>
		</main>
	)
}

export default App
