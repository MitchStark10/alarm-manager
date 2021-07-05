import queryRunner from './QueryRunner';
import mysql from 'mysql';

const CHECK_AUTHORIZATION_SQL = `
SELECT COUNT(*)
FROM Account
WHERE Email = ?
    AND ApiKey = ?
`;

export default {
    isUserAuthorized: async (userEmail: string, apiKey: string): Promise<boolean> => {
        const checkAuthQuery = mysql.format(CHECK_AUTHORIZATION_SQL, [userEmail, apiKey]);
        const checkAuthResults = await queryRunner.runQueryWithErrorHandling(checkAuthQuery);
        return checkAuthResults.success && checkAuthResults.result?.[0];
    }
};