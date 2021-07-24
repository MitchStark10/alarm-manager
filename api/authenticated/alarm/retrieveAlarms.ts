import express from 'express';
import mysql from 'mysql';
import queryRunner from '../../../services/QueryRunner';
const app = express();

// TODO: Pagination will (likely) be necessary with a larger data set
const RETRIEVE_ALRAMS_SQL = `
SELECT *
FROM Alarm
WHERE Email = ?
`;

app.post('', async (req, res) => {
    const { email } = req.body;
    const retrieveAlarmsQuery = mysql.format(RETRIEVE_ALRAMS_SQL, [email]);
    const retrieveAlarmsResponse = await queryRunner.runQueryWithErrorHandling(retrieveAlarmsQuery);
    res.status(retrieveAlarmsResponse.success ? 200 : 500).json(retrieveAlarmsResponse);
});

export default app;