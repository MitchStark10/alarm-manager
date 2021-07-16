import express from 'express';
import mysql from 'mysql';
import QueryRunner from '../../../services/QueryRunner';
const app = express();

const RETRIEVE_USER_FROM_COOKIE = `
SELECT Email
FROM Account
WHERE SessionCookie = ?
`;

app.post('', async (req, res) => {
    const {sessionCookie} = req.body;

    if (!sessionCookie) {
        return res.status(403).json({
            success: false,
            message: 'Session cookie was empty',
        });
    }

    const retrieveUserQuery = mysql.format(RETRIEVE_USER_FROM_COOKIE,
        [sessionCookie]);
    const retrieveUserResponse =
        await QueryRunner.runQueryWithErrorHandling(retrieveUserQuery);

    res.status(retrieveUserResponse.success ? 200 : 403)
        .json(retrieveUserResponse);
});

export default app;
