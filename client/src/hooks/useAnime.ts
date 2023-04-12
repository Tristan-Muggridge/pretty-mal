import { useEffect, useState } from "react";
import Anime from "../types/Anime";
import IMALSearchResult, { IMALAnime } from "../types/IMALSearchResult";
import { getSeason } from "../types/Seasons";

const headers = {'Content-Type': 'application/json'};

export default function useAnime(url: string, body: object | undefined = undefined) {
    const [anime, setAnime] = useState<Anime[]>([]);

    useEffect(() => {
        const currentSeason = getSeason(new Date().getMonth());
        
        const search = async () => {
            
            // check if the anime is in local storage
            const animeFromLocalStorage = localStorage.getItem(url);
            if (animeFromLocalStorage) {
                console.debug('Anime found in local storage')
                console.debug('expires in ' + (JSON.parse(animeFromLocalStorage).TTL - Date.now()) + 'ms')
                const {anime, TTL} = JSON.parse(animeFromLocalStorage);
                if (TTL > Date.now()) {
                    setAnime(anime);
                    return;
                }
            }
            
            console.debug('Anime not found in local storage');
            const request = await fetch(url, {
                method: body ? 'post' : 'get', 
                body: JSON.stringify(body), 
                headers: headers
            })

            const json = await request.json();
            const {data, error} = json;
            
            if (error) {
                console.error(error);
                return;
            }

            console.debug(data, url)
            const animeArray = data.map( (result: {node: IMALAnime}) => new Anime(result.node));

            // create a TTL for the anime set to 1 minute from now
            localStorage.setItem(url, JSON.stringify({anime: animeArray, TTL: Date.now() + 60000}));
            setAnime(animeArray)
        }

        search();
    }, [])

    return anime;
}