export default function Installation() {
    return (
        <>
            <h1>Installation and Development Instructions</h1>
            <ol>
                <li>To begin utilizing the project locally, clone the repo.</li>
                <li>Once cloned, run `npm install` at the base directory of the project.</li>
                <li>TODO: Setup MySQL instructions</li>
                <li>TODO: Env variables setup</li>
                <li>
                    You will be able to run the project in developer mode by using `npm run dev`. Otherwise, you can
                    build the project for production mode using `npm run build`.
                </li>
                <li>
                    Installation to an AWS Elastic Beanstalk instance has been setup through the release script and
                    .ebignore file.
                </li>
                <li>TODO: Instructions on how to setup your AWS server.</li>
                <li>TOOD: Instructions on how to run EB init</li>
            </ol>
        </>
    );
}
