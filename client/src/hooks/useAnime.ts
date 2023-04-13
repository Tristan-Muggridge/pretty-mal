import { useEffect, useState } from "react";
import Anime from "../types/Anime";
import { IMALAnime } from "../types/IMALSearchResult";

const headers = {'Content-Type': 'application/json'};

const readFromLocalStorage = (url: string):Anime[] => {
    const anime = localStorage.getItem(url);
    if (!anime) return [];

    const {anime: localAnime, TTL} = JSON.parse(anime);
    if (TTL < Date.now()) return [];

    console.debug('Hours Remaining on TTL:', Math.floor((TTL - Date.now()) / 1000 / 60 / 60));
    return localAnime;
}

const writeToLocalStorage = (url: string, anime: Anime[]) => {
    const TTLDuration = 60 * 60 * 24; // 24 hours
    localStorage.setItem(url, JSON.stringify({anime, TTL: Date.now() + TTLDuration * 1000}));
}

export default function useAnime(url: string, body: object | undefined = undefined) {
    const [anime, setAnime] = useState<Anime[]>([]);

    useEffect(() => {       
        const search = async () => {
            
            // check if the anime is in local storage
            const animeFromLocalStorage = readFromLocalStorage(url);
            if (animeFromLocalStorage.length > 0) {
                setAnime(animeFromLocalStorage);
                return;
            }
            
            const request = await fetch(url, {
                method: body ? 'post' : 'get', 
                body: JSON.stringify(body), 
                headers: headers
            });

            const json = await request.json();
            const {data, error} = json;    

            const animeArray = data.map( (result: {node: IMALAnime}) => new Anime(result.node));

            writeToLocalStorage(url, animeArray);

            setAnime(animeArray)
        }

        search();
    }, [])

    return anime;
}