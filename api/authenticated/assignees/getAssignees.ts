import express from 'express';
import mysql from 'mysql';
import QueryRunner from '../../../services/QueryRunner';
const app = express();

const GET_ASSGINEES_SQL = `
SELECT AssigneeID FROM Assignee
WHERE AccountEmail = ?
`;

app.get('', async (req, res) => {
    const { email } = req.body;

    const getAssigneesQuery = mysql.format(GET_ASSGINEES_SQL, [email]);
    const getAssigneesResponse = await QueryRunner.runQueryWithErrorHandling(getAssigneesQuery);

    res.status(getAssigneesResponse.success ? 200 : 500).json(getAssigneesResponse);
});

export default app;

