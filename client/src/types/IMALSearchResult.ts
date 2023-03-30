export interface IMain_Picture {
	large: string;
	medium: string;
}

export interface IAlternative_Titles {
	synonyms: string[];
	en: string;
	ja: string;
}

export interface IGenre {
	id: number;
	name: string;
}

export interface IBroadcast {
	day_of_the_week: string;
	start_time: string;
}

export interface IStudio {
	id: number;
	name: string;
}

export default interface IMALSearchResult {
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
	studios: IStudio,
}