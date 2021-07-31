import mysql, { PoolConnection, Pool, MysqlError } from 'mysql';

class QueryRunner {
    pool: Pool;

    constructor() {
        this.pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
        });
    }

    logQueryResponse(queryText: string, rows: any[]) {
        console.log('For query: ' + queryText);
        console.log(JSON.stringify(rows) + ' row(s) returned');
        console.log('\n\n\n');
    }

    logError(sqlQuery: string, error: MysqlError) {
        console.error('Error performing: ' + sqlQuery + '\n' + error + '\n\n');
    }

    async runQuery(sqlQuery: string, withLog: boolean = true): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection(
                (err: MysqlError, connection: PoolConnection) => {
                    if (err) {
                        withLog && this.logError(sqlQuery, err);
                        reject(err);
                        return;
                    }

                    if (!connection) {
                        reject(new Error('Connection to DB was not created'));
                        return;
                    }

                    connection.query(sqlQuery, (queryError, response) => {
                        if (queryError) {
                            withLog && this.logError(sqlQuery, queryError);
                            reject(queryError);
                            return;
                        }

                        withLog && this.logQueryResponse(sqlQuery, response);
                        resolve(response);
                    });

                    connection.release();
                },
            );
        });
    }

    async runQueryWithErrorHandling(
        sqlQuery: string,
        withLog: boolean = true,
    ): Promise<any> {
        try {
            return {
                success: true,
                result: await this.runQuery(sqlQuery),
            };
        } catch (error) {
            withLog && console.error('Error caught during query:' + error);
            return {
                success: false,
                error,
            };
        }
    }
}

export default new QueryRunner();
