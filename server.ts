import express from 'express';
import path from 'path';
import 'dotenv';
const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/api', ( req, res ) => {
    res.send( 'Hello world!' );
});

app.listen( port, () => {
    console.log(`server started at http://localhost:${ port }`);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});