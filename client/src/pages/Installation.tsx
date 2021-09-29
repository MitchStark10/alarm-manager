export default function Installation() {
    return (
        <>
            <h1>Installation and Development Instructions</h1>
            <ol>
                <li>To begin utilizing the project locally, clone the repo.</li>
                <li>Once cloned, run `npm install` at the base directory of the project.</li>
                <li>Persistent data storage
                    <ul>
                        <li>CASM utilizes a MySQL intance for data storage. You can use any hosting
                            provider with MySQL support for your data storage.
                        </li>
                        <li>Once you have setup your MySQL instance, CASM requires the following environment
                            variables to be set in order to store account information, alarms, etc.
                            <ul>
                                <li>MYSQL_HOST</li>
                                <li>MySQL_USER</li>
                                <li>MYSQL_PASSWORD</li>
                                <li>MYSQL_DATABASE</li>
                            </ul>
                        </li>
                        <li>The above environment variables are referenced in services/QueryRunner.ts in case you  need
                            to do any logging/debugging.
                        </li>
                    </ul>
                </li>
                <li>
                    You will be able to run the project in developer mode by using `npm run dev`. Otherwise, you can
                    build the project for production mode using `npm run build`.
                </li>
                <li>
                    Installation to an AWS Elastic Beanstalk instance has been setup through the release script and
                    .ebignore file. If you need instructions on how to setup your Elastic Beanstalk server, feel free to following
                    Amazon's documentation on that can be found <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html">here</a>
                </li>
                <li>You will be able to deploy the project to the Elastic Beanstalk server using `node release.js`. This automates
                    tagging the application, along with zipping and deploying the code to to Elastic Beanstalk. However, This
                    script utilize the Elastic Beanstalk CLI. For instructions on how to install the CLI and initialize your project's local
                    connection into your server <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html">here</a>.
                </li>
            </ol>
        </>
    );
}
