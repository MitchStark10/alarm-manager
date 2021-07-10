import express from 'express';
import mysql from 'mysql';
import EncryptionUtils from '../../../services/EncryptionUtils';
import queryRunner from '../../../services/QueryRunner';
const app = express();

const RETRIEVE_USER_SQL = `
SELECT PassHash
FROM User
WHERE Email = ?
`;

app.post('', async (req, res) => {
    const {email, password} = req.body;
    const retrieveUserQuery = mysql.format(RETRIEVE_USER_SQL, [email]);
    const retrieveUserResponse = await queryRunner.runQueryWithErrorHandling(retrieveUserQuery);

    if (!retrieveUserResponse.success) {
        return res.status(500).json({
            success: false,
            message: 'Internal Error Occurred'
        });
    }

    if (retrieveUserResponse.result.length !== 1) {
        return res.status(403).json({
            success: false,
            message: 'User not found'
        });
    }

    const passHash = retrieveUserResponse.result[0].PassHash;
    const isPasswordCorrect = await EncryptionUtils.comparePasswordToHash(password, passHash);
    res.status(isPasswordCorrect ? 200 : 403);
});

export default app;