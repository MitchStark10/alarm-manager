import express from 'express';
import authenticatedServices from './authenticated';
import publicServices from './public';
const app = express();

app.use('/authenticated', authenticatedServices);
app.use('/public', publicServices);


export default app;
