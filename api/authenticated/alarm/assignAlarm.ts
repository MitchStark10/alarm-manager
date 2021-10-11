import express from 'express';
const app = express();

app.put('', (req, res) => {
    console.log(req);

    res.status(200).send('');
});

export default app;
