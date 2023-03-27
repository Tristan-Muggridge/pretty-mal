var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
const app = express();
dotenv.config();
let port = 3000;
const corsOption = {
    origin: 'http://localhost:5173',
};
app.use(cors(corsOption));
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
const sendResponse = (res, data) => { console.debug(data); res.send(data); };
app.get('/search/:searchQuery', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grabInfoFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_V3_KEY}&language=en-US&page=1&include_adult=false&query=${req.params["searchQuery"]}`, { method: 'get', headers: { contentType: 'application/json' } })).json();
    });
    sendResponse(res, yield grabInfoFromDB());
}));
app.get('/providers/:type/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grabInfoFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield (yield fetch(`https://api.themoviedb.org/3/${req.params.type}/${req.params.id}/watch/providers?api_key=${process.env.TMDB_V3_KEY}`, { method: 'get', headers: { contentType: 'application/json' } })).json();
    });
    sendResponse(res, yield grabInfoFromDB());
}));
app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
});
//# sourceMappingURL=server.js.map