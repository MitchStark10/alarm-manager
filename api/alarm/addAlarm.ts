import express from 'express';
import mysql from 'mysql';
import queryRunner from '../../services/QueryRunner';
const app = express();

const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Alarm
(Email, AlarmText, AlarmDateTime)
(?, ?, NOW())
`;

app.post('', async (req, res) => {
    const {email, alarmText} = req.body;
    const addNewAlarmQuery = mysql.format(ADD_NEW_ACCOUNT_SQL, [email, alarmText]);
    const addNewAlarmResult = await queryRunner.runQueryWithErrorHandling(addNewAlarmQuery);
    res.status(addNewAlarmResult.success ? 200 : 500).json(addNewAlarmResult);
});

export default app;