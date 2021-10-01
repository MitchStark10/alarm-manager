import express from 'express';
import mysql from 'mysql';
import QueryRunner from '../../services/QueryRunner';
const app = express();

// TODO: This is duplicated with the new account service. Probably should
// find some way to share this bit of code.
const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Alarm
(Email, AlarmTitle, AlarmDetails, AlarmDateTime)
VALUES (?, ?, ?, NOW())
`;

app.post('', async (req, res) => {
    const { alarmTitle, alarmDetails } = req.body;
    const emailToAddTheLogTo = process.env.BOOTSTRAP_EMAIL;
    const query = mysql.format(ADD_NEW_ACCOUNT_SQL, [emailToAddTheLogTo, alarmTitle, alarmDetails]);
    const response = await QueryRunner.runQueryWithErrorHandling(query);
    res.status(response.success ? 200 : 500).json(response);
});

export default app;
