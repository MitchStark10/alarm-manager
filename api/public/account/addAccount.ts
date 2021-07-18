import express from 'express';
import mysql from 'mysql';
import queryRunner from '../../../services/QueryRunner';
import EncryptionUtils from '../../../services/EncryptionUtils';
import CookieManager from '../../../services/CookieManager';
const app = express();


const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Account
(Email, PassHash, ApiKey, SessionCookie)
VALUES (?, ?, ?, ?)
`;

app.post('', async (req, res) => {
    const {email, password} = req.body;
    const sessionCookie = EncryptionUtils.generateKey();
    const addNewAccountQuery = mysql.format(ADD_NEW_ACCOUNT_SQL, [
        email,
        await EncryptionUtils.encryptPassword(password),
        EncryptionUtils.generateKey(), sessionCookie,
    ]);
    const addNewAccountResult =
        await queryRunner.runQueryWithErrorHandling(addNewAccountQuery);

    if (addNewAccountResult.success) {
        CookieManager.setCookie(res, sessionCookie);
    }

    res.status(addNewAccountResult.success ? 200 : 500)
        .json(addNewAccountResult);
});

export default app;
