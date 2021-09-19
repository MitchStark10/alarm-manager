import express from 'express';
import logPageLoad from './logPageLoad';
const app = express();

app.use('/logPageLoad', logPageLoad);

export default app;
