import express from 'express';
import addAlarm from './alarm/addAlarm';
const app = express();

app.use('/alarm/addAlarm', addAlarm);

export default app;