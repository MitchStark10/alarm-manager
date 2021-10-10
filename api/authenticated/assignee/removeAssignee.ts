import express from 'express';
import QueryRunner from '../../../services/QueryRunner';
import mysql from 'mysql';
const app = express();

const DELETE_ASSIGNEE_SQL = `
DELETE FROM Assignee
WHERE AssigneeID = ? AND AccountEmail = ?
 `;

app.put('', async (req, res) => {
    const { assigneeId, accountEmail } = req.body;

    const deleteAssigneeQuery = mysql.format(DELETE_ASSIGNEE_SQL, [assigneeId, accountEmail]);
    const deleteAssigneeResponse = await QueryRunner.runQueryWithErrorHandling(deleteAssigneeQuery);

    res.status(deleteAssigneeResponse.success ? 200 : 500).json(deleteAssigneeResponse);
});

export default app;
