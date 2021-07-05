import express from 'express';
import mysql from 'mysql';
import queryRunner from '../../../services/QueryRunner';
import EncryptionUtils from '../../../services/EncryptionUtils';
const app = express();

const ADD_NEW_ACCOUNT_SQL = `
INSERT INTO Account
(Email, PassHash, ApiKey)
VALUES (?, ?, ?)
`;

app.post('/addAccount', async (req, res) => {
    const {email, password} = req.body;
    const addNewAccountQuery = mysql.format(ADD_NEW_ACCOUNT_SQL, [email, await EncryptionUtils.encryptPassword(password), EncryptionUtils.generateApiKey()]);
    const addNewAccountResult = await queryRunner.runQueryWithErrorHandling(addNewAccountQuery);
    res.status(addNewAccountResult.success ? 200 : 500).json(addNewAccountResult);
});

export default app;