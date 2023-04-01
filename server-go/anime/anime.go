package anime

type Node struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	MainPicture struct {
		Medium string `json:"medium"`
		Large  string `json:"large"`
	} `json:"main_picture"`
	AlternativeTitles struct {
		Synonyms []string `json:"synonyms"`
		En       string   `json:"en"`
		Ja       string   `json:"ja"`
	} `json:"alternative_titles"`
	StartDate       string  `json:"start_date"`
	EndDate         string  `json:"end_date"`
	Synopsis        string  `json:"synopsis"`
	Mean            float64 `json:"mean"`
	Rank            int     `json:"rank"`
	Popularity      int     `json:"popularity"`
	NumListUsers    int     `json:"num_list_users"`
	NumScoringUsers int     `json:"num_scoring_users"`
	NSFW            string  `json:"nsfw"`
	CreatedAt       string  `json:"created_at"`
	UpdatedAt       string  `json:"updated_at"`
	MediaType       string  `json:"media_type"`
	Status          string  `json:"status"`
	Genres          []struct {
		ID   int    `json:"id"`
		Name string `json:"name"`
	} `json:"genres"`
}

type Anime struct {
	Data []struct {
		Node Node `json:"node"`
	} `json:"data"`

	Paging struct {
		Next string `json:"next"`
	} `json:"paging"`

	Season struct {
		Year   int    `json:"year"`
		Season string `json:"season"`
	}
}
