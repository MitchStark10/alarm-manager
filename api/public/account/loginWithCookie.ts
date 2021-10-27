import express from 'express';
import mysql from 'mysql';
import CookieManager from '../../../services/CookieManager';
import QueryRunner from '../../../services/QueryRunner';
const app = express();

const RETRIEVE_USER_FROM_COOKIE = `
SELECT Email
FROM Account
WHERE SessionCookie = ?
`;

app.get('', async (req, res) => {
    const sessionCookie = req.cookies?.['am-session'];

    if (!sessionCookie) {
        return res.status(403).json({
            success: false,
            message: 'Session cookie was empty',
        });
    }

    const retrieveUserQuery = mysql.format(RETRIEVE_USER_FROM_COOKIE, [
        sessionCookie,
    ]);
    const retrieveUserResponse = await QueryRunner.runQueryWithErrorHandling(
        retrieveUserQuery,
    );

    const isUserAuthenticated =
        retrieveUserResponse.success &&
        retrieveUserResponse.result?.length === 1;

    if (!isUserAuthenticated) {
        CookieManager.unsetCookie(res);
        retrieveUserResponse.success = false;
    }

    res.status(isUserAuthenticated ? 200 : 403).json(retrieveUserResponse);
});

export default app;
