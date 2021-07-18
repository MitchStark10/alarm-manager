import express from 'express';
import mysql from 'mysql';
import CookieManager from '../../../services/CookieManager';
import EncryptionUtils from '../../../services/EncryptionUtils';
import queryRunner from '../../../services/QueryRunner';
const app = express();

const RETRIEVE_USER_SQL = `
SELECT PassHash
FROM Account
WHERE Email = ?
`;

const STORE_USER_COOKIE_SQL = `
UPDATE Account
SET SessionCookie = ?
WHERE Email = ?
`;

app.post('', async (req, res) => {
    const {email, password} = req.body;
    const retrieveUserQuery = mysql.format(RETRIEVE_USER_SQL, [email]);
    const retrieveUserResponse =
        await queryRunner.runQueryWithErrorHandling(retrieveUserQuery);

    if (!retrieveUserResponse.success) {
        return res.status(500).json({
            success: false,
            message: 'Internal Error Occurred',
        });
    }

    if (retrieveUserResponse.result.length !== 1) {
        return res.status(403).json({
            success: false,
            message: 'User not found',
        });
    }

    const passHash = retrieveUserResponse.result[0].PassHash;
    const isPasswordCorrect =
        await EncryptionUtils.comparePasswordToHash(password, passHash);

    if (isPasswordCorrect) {
        const sessionCookie = EncryptionUtils.generateKey();
        const insertCookieQuery =
            mysql.format(STORE_USER_COOKIE_SQL, [sessionCookie, email]);
        queryRunner.runQueryWithErrorHandling(insertCookieQuery);
        CookieManager.setCookie(res, sessionCookie);
    }

    res.status(isPasswordCorrect ? 200 : 403).json({
        success: isPasswordCorrect,
    });
});

export default app;
