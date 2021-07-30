import express from 'express';
import QueryRunner from '../../../services/QueryRunner';
import mysql from 'mysql';
const app = express();

const DELETE_ALARM_BY_ID_SQL = `
DELETE FROM Alarm
WHERE ID = ? AND Email = ?
`;

app.delete('', async (req, res) => {
    const { id, email } = req.body;
    const deleteAlarmQuery = mysql.format(DELETE_ALARM_BY_ID_SQL, [id, email]);
    const response = await QueryRunner.runQueryWithErrorHandling(deleteAlarmQuery);

    res.sendStatus(response.success ? 200 : 500);
});

export default app;