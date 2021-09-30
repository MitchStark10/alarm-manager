import express from 'express';
import mysql from 'mysql';
import queryRunner from '../../../services/QueryRunner';
const app = express();

const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Alarm
(Email, AlarmTitle, AlarmDateTime)
VALUES (?, ?, NOW())
`;

app.post('', async (req, res) => {
    const {email, alarmTitle} = req.body;
    const addNewAlarmQuery = mysql.format(ADD_NEW_ACCOUNT_SQL, [email, alarmTitle]);
    const addNewAlarmResult = await queryRunner.runQueryWithErrorHandling(addNewAlarmQuery);
    res.status(addNewAlarmResult.success ? 200 : 500).json(addNewAlarmResult);
});

export default app;
