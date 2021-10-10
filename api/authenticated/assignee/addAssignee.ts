import express from 'express';
import QueryRunner from '../../../services/QueryRunner';
import mysql from 'mysql';
const app = express();

const ADD_ASSIGNEE_SQL = `
 INSERT INTO Assignee
 (AssigneeID, AccountEmail)
 VALUES(?, ?)
 `;

app.put('', async (req, res) => {
    console.log(req);

    const { assigneeId, accountEmail } = req.body;

    const addAssigneeQuery = mysql.format(ADD_ASSIGNEE_SQL, [assigneeId, accountEmail]);
    const addAssigneeResponse = await QueryRunner.runQueryWithErrorHandling(addAssigneeQuery);

    res.status(addAssigneeResponse.success ? 200 : 500).json(addAssigneeResponse);
});

export default app;
