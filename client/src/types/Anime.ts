import IMALSearchResult, { IAlternative_Titles, IMain_Picture, IGenre, IStudio } from "./IMALSearchResult";

export default class Anime {
	id: number;
	title: string;
	alternativeTitles: IAlternative_Titles;
	
	main_picture: IMain_Picture;
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
		this.main_picture = data.main_picture;
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
