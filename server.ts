import express from 'express';
import path from 'path';
import 'dotenv';
import api from './api';
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', api);

app.listen( port, () => {
    console.log(`server started at http://localhost:${ port }`);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});