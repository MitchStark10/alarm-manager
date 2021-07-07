import express from 'express';
import addAlarmService from './alarm/addAlarm';
import retrieveAlarmService from './alarm/retrieveAlarms';
const app = express();

app.use('/alarm/addAlarm', addAlarmService);
app.use('/alarm/retrieveAlarm', retrieveAlarmService);

export default app;