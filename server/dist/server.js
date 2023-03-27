var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
const app = express();
dotenv.config();
let port = 3000;
const corsOption = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOption));
app.use(json());
app.use(express.urlencoded({ extended: true }));
const porArg = process.argv.find(arg => arg.startsWith('--port='));
if (porArg) {
    port = parseInt(porArg.split('=')[1]);
}
app.get('/', (req, res) => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_V3_KEY}&language=en-US`, { method: 'get', headers: { contentType: 'application/json' } }).then(response => {
        response.json().then(data => {
            res.send(data);
        }).catch(error => res.send(error));
    }).catch(error => res.send(error));
});
const MALHeaders = { 'X-MAL-Client-ID': process.env.MAL_CLIENT_ID };
app.get('/search/:searchQuery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grabInfoFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_V3_KEY}&language=en-US&page=1&include_adult=false&query=${req.params["searchQuery"]}`, { method: 'get', headers: { contentType: 'application/json' } })).json();
    });
    res.send(yield grabInfoFromDB());
}));
app.post('/season', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { year, season } = req.body;
    const request = yield fetch(`https://api.myanimelist.net/v2/anime/season/${year}/${season}?limit=25&fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics&nsfw=true`, { headers: MALHeaders, method: 'get' });
    const data = yield request.json();
    res.send(data);
}));
app.get('/providers/:type/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // res.send(await grabInfoFromDB());
}));
app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
});
//# sourceMappingURL=server.js.map