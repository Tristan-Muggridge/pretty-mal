import {IMALManga, IAuthor, MangaMediaType, IAlternative_Titles, IMain_Picture, IGenre, IStudio } from "./IMALSearchResult";

export default class Manga implements IMALManga{
    id: number;
	title: string;
	main_picture: IMain_Picture;
	alternative_titles: IAlternative_Titles;
	start_date: string;
	end_date: string;
	synopsis: string;
	mean: number;
	rank: number;
	popularity: number;
	num_list_users: number;
	num_scoring_users: number;
	nsfw: string;
	genres: IGenre[];
	status: string;
	my_list_status: string;
	created_at: string;
	updated_at: string;

    media_type: MangaMediaType;
	num_volumes: number;
	num_chapters: number;
	authors: IAuthor[];

	constructor(data: IMALManga) {				
		this.id = data.id;
		this.title = data.title;
		this.alternative_titles = data.alternative_titles ?? [];
		this.main_picture = data.main_picture;
		this.genres = data.genres;
		this.synopsis = data.synopsis;
		this.mean = data.mean;
		this.rank = data.rank;
		this.nsfw = data.nsfw;

        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.popularity = data.popularity;
        this.num_list_users = data.num_list_users;
        this.num_scoring_users = data.num_scoring_users;
        this.status = data.status;
        this.my_list_status = data.my_list_status;
        this.created_at = data.created_at;
        this.updated_at = data.updated_at;

        this.media_type = data.media_type;
        this.num_volumes = data.num_volumes;
        this.num_chapters = data.num_chapters;
        this.authors = data.authors;
	}
}
