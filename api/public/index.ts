import express from 'express';
import addAccount from './account/addAccount';
const app = express();

// TODO: Authentication needed

app.use('/account/addAccount', addAccount);

export default app;