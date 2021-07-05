import express from 'express';
import addAccount from './account/addAccount';
const app = express();

app.use('/account/addAccount', addAccount);

export default app;