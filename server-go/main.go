package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"

	"github.com/joho/godotenv"

	"pretty-mal.com/anime"
)

func request(client *http.Client, url string) *http.Response {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		log.Fatal(err)
	}

	req.Header.Set("X-MAL-Client-ID", os.Getenv("MAL_CLIENT_ID"))
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	return resp
}

func main() {

	godotenv.Load(".env")

	// Setup server defaults
	r := gin.Default()

	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:5173"}
	r.Use(cors.New(corsConfig))

	MALclient := &http.Client{
		Timeout: time.Second * 10,
	}

	r.GET("/:year/:season", func(c *gin.Context) {

		year := c.Param("year")
		season := c.Param("season")
		url := fmt.Sprintf("https://api.myanimelist.net/v2/anime/season/%s/%s?limit=25&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics&nsfw=true", year, season)

		resp := request(MALclient, url)
		defer resp.Body.Close()

		var data anime.Anime

		if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
			log.Fatal(err)
			c.JSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
		}

		c.JSON(http.StatusOK, data)
	})

	r.Run(":8080")
}
