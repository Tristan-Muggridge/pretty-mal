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
// app.get('/', (req: express.Request, res: express.Response) => {
//     fetch('http://localhost:5173/api/Values')
//     .then(response => {
//         res.send({ message: 'Hello World!' });
//     })
//     .catch(error => {
//         res.send({ error: 'Something Went Wrong!' });
//     });
// })
app.get('/', (req, res) => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_V3_KEY}&language=en-US`, { method: 'get', headers: { contentType: 'application/json' } }).then(response => {
        response.json().then(data => {
            res.send(data);
        }).catch(error => res.send(error));
    }).catch(error => res.send(error));
});
app.get('/search/:searchQuery', (req, res) => {
    fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.TMDB_V3_KEY}&language=en-US&page=1&include_adult=true&query=${req.params["searchQuery"]}`, { method: 'get', headers: { contentType: 'application/json' } })
        .then(response => {
        response.json()
            .then(data => res.send(data))
            .catch(error => res.send(error));
    })
        .catch(error => res.send(error));
});
app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`);
});
//# sourceMappingURL=server.js.map