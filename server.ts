import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

// ENV variables must be initialized before the API/QueryRunner initializes
dotenv.config({ path: __dirname + '/.env' });
import api from './api';
const app = express();
const port = process.env.PORT || 8080;

// Use required middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use('/api', api);

// Serve from specified port
app.listen( port, () => {
    console.log(`server started at http://localhost:${ port }`);
});

// All unfound get requests get forwared to react app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});