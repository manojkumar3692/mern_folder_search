import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Routers
import fileSystemRoutes from './routes/fileSystem.js'



const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))


app.use('/systemInformation', fileSystemRoutes)

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
    return console.log(`${'Sever is running at' + PORT}`)
})