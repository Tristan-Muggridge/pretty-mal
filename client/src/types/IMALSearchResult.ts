export enum NSFW {
	"white" = "white",
	"grey" = "grey",
	"black" = "black"
}

export enum MangaMediaType {
    unknown = "unknown",
    manga = "manga",
    novel = "novel",
    oneShot = "oneShot",
    doujinshi = "doujinshi",
    manhwa = "manhwa",
    manhua = "manhua",
    oel = "oel"
}

export enum AnimeMediaType {
	unknown = "unknown",
	tv = "tv",
	ova = "ova",
	movie = "movie",
	special = "special",
	ona = "ona",
	music = "music",
}

export interface IAuthor {
	id: number;
	first_name: string;
	last_name: string;
	role: string;
}

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
	genres: IGenre[],
	status: string,
	my_list_status: string,
	created_at: string,
	updated_at: string,
}

export interface IMALAnime extends IMALSearchResult {
	source: string,
	average_episode_duration: number,
	studios: IStudio,
	media_type: AnimeMediaType,
	num_episodes: number,
	start_season: string,
	broadcast: IBroadcast,
	rating: string,
}

export interface IMALManga extends IMALSearchResult {
	media_type: MangaMediaType,
	num_volumes: number,
	num_chapters: number,
	authors: IAuthor[],
}