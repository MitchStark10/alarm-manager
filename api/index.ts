import express from 'express';
import authenticatedServices from './authenticated';
import bootstrapServices from './bootstrap';
import publicServices from './public';
const app = express();

app.use('/authenticated', authenticatedServices);
app.use('/public', publicServices);
app.use('/bootstrap', bootstrapServices);

export default app;
