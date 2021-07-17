import express from 'express';
import mysql from 'mysql';
import queryRunner from '../../../services/QueryRunner';
import EncryptionUtils from '../../../services/EncryptionUtils';
const app = express();

// ms * s * m * h * d = 7 days
const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 7;

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
        res.cookie('am-session', sessionCookie, {
            maxAge: COOKIE_MAX_AGE,
            httpOnly: true,
            signed: true,
        });
    }

    res.status(addNewAccountResult.success ? 200 : 500)
        .json(addNewAccountResult);
});

export default app;
