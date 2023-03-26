import express from 'express';
import cors from 'cors';

const app = express();

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
    res.send({message: 'Hello World!'});
})

app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`)
})