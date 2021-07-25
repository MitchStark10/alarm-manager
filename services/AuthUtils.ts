import queryRunner from './QueryRunner';
import mysql from 'mysql';

const CHECK_AUTHORIZATION_SQL = `
SELECT COUNT(*) AS UserCount
FROM Account
WHERE Email = ?
    AND (ApiKey = ? OR SessionCookie = ?)
`;

export default {
    isUserAuthorized: async (userEmail: string, apiKey: string, cookie: string): Promise<boolean> => {
        const checkAuthQuery = mysql.format(CHECK_AUTHORIZATION_SQL, [userEmail, apiKey, cookie]);
        const checkAuthResults = await queryRunner.runQueryWithErrorHandling(checkAuthQuery);
        return checkAuthResults.success && checkAuthResults.result?.[0]?.UserCount === 1;
    },
};
