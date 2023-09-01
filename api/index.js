import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'
import normalRoutes from './routes/normalRoutes.js'
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import * as url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));



const app = express();

app.use(express.json())

app.use(cookieParser())



app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


app.get('/test', (req, res, next) => {
    res.json('test ok')
});

app.use(userRoutes);
app.use(normalRoutes);


mongoose.connect(process.env.MONGO_URL).then(
    app.listen(process.env.PORT, () => {
        console.log('Working on port ' + process.env.PORT)
    })
).catch(err =>
    console.log(err)
)

