import { useEffect, useState } from "react";
import Manga from "../types/Manga";
import { IMALManga } from "../types/IMALSearchResult";
import { getSeason } from "../types/Seasons";

const headers = {'Content-Type': 'application/json'};

export default function useManga(url: string, body: object | undefined = undefined) {
    const [manga, setManga] = useState<Manga[]>([]);

    useEffect(() => {
        const currentSeason = getSeason(new Date().getMonth());
        
        const search = async () => {
            
            // check if the manga is in local storage
            const mangaFromLocalStorage = localStorage.getItem('manga');
            if (mangaFromLocalStorage) {
                console.debug('Manga found in local storage')
                console.debug('expires in ' + (JSON.parse(mangaFromLocalStorage).TTL - Date.now()) + 'ms')
                const {manga, TTL} = JSON.parse(mangaFromLocalStorage);
                if (TTL > Date.now()) {
                    setManga(manga);
                    return;
                }
            }
            
            console.debug('Manga not found in local storage');
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

            const mangaArray = data.map( (result: {node: IMALManga}) => new Manga(result.node));

            // create a TTL for the manga set to 1 minute from now
            localStorage.setItem('manga', JSON.stringify({manga: mangaArray, TTL: Date.now() + 60000}));
            setManga(mangaArray)
        }

        search();
    }, [])

    return manga;
}