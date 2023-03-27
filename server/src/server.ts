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

const sendResponse = (res: express.Response, data: any) => {console.debug(data); res.send(data)}

app.get('/search/:searchQuery', async (req: express.Request, res: express.Response) => {
    
    const grabInfoFromDB = async () =>{
        return await ( await fetch(
            `https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_V3_KEY}&language=en-US&page=1&include_adult=false&query=${req.params["searchQuery"]}`,
            { method: 'get', headers: {contentType: 'application/json'} }
        )).json();
    }

    sendResponse(res, await grabInfoFromDB());
})

app.get('/providers/:type/:id', async (req: express.Request, res: express.Response) => {
    
    const grabInfoFromDB = async () =>{
        return await ( await fetch(
            `https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/watch/providers?api_key=${process.env.TMDB_V3_KEY}`,
            { method: 'get', headers: {contentType: 'application/json'} }
        )).json();
    }

    sendResponse(res, await grabInfoFromDB());
})

app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`)
})