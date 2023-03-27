import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

const app = express();

dotenv.config();

let port = 3000;
const corsOption = {
    origin: 'http://localhost:5173',
}

app.use(cors(corsOption));

const porArg = process.argv.find(arg => arg.startsWith('--port='));
if (porArg) {
  port = parseInt(porArg.split('=')[1]);
}

app.get('/', (req: express.Request, res: express.Response) => {
    
    fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_V3_KEY}&language=en-US`,
        { method: 'get', headers: {contentType: 'application/json'} }
    ).then( response => {
        response.json().then( data => {
            res.send(data);
        }).catch( error => res.send(error) )
    }).catch( error => res.send(error) )
    
})

const MALHeaders = { 'X-MAL-Client-ID': process.env.MAL_CLIENT_ID };

app.get('/search/:searchQuery', async (req: express.Request, res: express.Response) => {
    
    const grabInfoFromDB = async () =>{
        return await ( await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_V3_KEY}&language=en-US&page=1&include_adult=false&query=${req.params["searchQuery"]}`,
            { method: 'get', headers: {contentType: 'application/json'} }
        )).json();
    }

    res.send(await grabInfoFromDB());
})

app.get('/test', async (req: express.Request, res: express.Response) => {

    const request = await fetch(`https://api.myanimelist.net/v2/anime/season/2017/summer?limit=4`, {headers: MALHeaders, method: 'get'})
    const data = await request.json();

    res.send(data);
});

app.get('/providers/:type/:id', async (req: express.Request, res: express.Response) => {
    
    

    // res.send(await grabInfoFromDB());
})

app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`)
})