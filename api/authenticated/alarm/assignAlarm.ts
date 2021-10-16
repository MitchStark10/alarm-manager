import express from 'express';
import mysql from 'mysql';
import QueryRunner from '../../../services/QueryRunner';
const app = express();

const CREATE_ASSIGNEE_IF_NEEDED = `
INSERT IGNORE INTO Assignee
(AssigneeID, AccountEmail)
VALUES (?, ?)
`;

const ASSIGN_ALARM_SQL = `
UPDATE Alarm
SET AssigneeID = ?
WHERE ID = ?
`;

app.put('', async (req, res) => {
    const { assigneeId, email, alarmId } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: 'Email is required',
        });
    }

    const addAssigneeQuery = mysql.format(CREATE_ASSIGNEE_IF_NEEDED, [assigneeId, email]);
    const addAssigneeResponse = await QueryRunner.runQueryWithErrorHandling(addAssigneeQuery);

    if (!addAssigneeResponse.success) {
        return res.status(500).json(addAssigneeResponse);
    }

    const assignAlarmQuery = mysql.format(ASSIGN_ALARM_SQL, [assigneeId, alarmId]);
    const assignAlarmResponse = await QueryRunner.runQueryWithErrorHandling(assignAlarmQuery);

    res.status(assignAlarmResponse.success ? 200 : 500).json(assignAlarmResponse);
});

export default app;
