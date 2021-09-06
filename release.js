const prompt = require('prompt-sync')({sigint: true});
const fs = require('fs');
const exec = require('child_process').exec;

exec('git branch', function(_gitBrError, gitBrStdOut) {
    let deployTarget;

    if (gitBrStdOut.includes('* main')) {
        deployTarget = 'prod';
    } else if (gitBrStdOut.includes('* develop')) {
        deployTarget = 'sand';
    } else {
        console.error('unknown branch. Deploy from develop or main only.');
        process.exit(-1);
    }

    const packageJson = require('./package.json');
    const currentVersion = packageJson.version;
    let releaseTag = currentVersion + '-' + deployTarget;

    if (deployTarget === 'prod') {
        const releaseType = prompt('Release type (major/minor/patch): ');

        if (!['major', 'minor', 'patch'].includes(releaseType)) {
            console.log('Unknown release type: ' + releaseType);
            process.exit(-1);
        }

        let majorVersion = parseInt(currentVersion.split('.')[0]);
        let minorVersion = parseInt(currentVersion.split('.')[1]);
        let patchVersion = parseInt(currentVersion.split('.')[2]);

        if (releaseType === 'major') {
            majorVersion++;
            minorVersion = 0;
            patchVersion = 0;
        } else if (releaseType === 'minor') {
            minorVersion++;
            patchVersion = 0;
        } else {
            patchVersion++;
        }

        const newVersion = [majorVersion, minorVersion, patchVersion].join('.');
        packageJson.version = newVersion;

        releaseTag = newVersion + '-' + deployTarget;
        console.log('Tagging new release: ' + releaseTag);

        fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2));
    }

    console.log('Running `npm run build`');
    exec('npm run build', function(buildError, buildStdOut, buildStdError) {
        console.log(buildStdOut);
        if (buildError) {
            console.error(buildStdError);
            process.exit(-1);
        }
        exec('git tag "' + releaseTag + '"', () => {
            console.log('About to push the tag to github');
            exec('git add .; git commit -m "release' + releaseTag + '" --no-verify; git push --no-verify; git push --tags', (_gitUpdateErr, gitUpdateStdOut) => {
                console.log(gitUpdateStdOut);
                console.log('About to run \'eb deploy\', this may take several minutes...');
                exec('eb deploy', (_deployError, deployStdOut) => {
                    console.log(deployStdOut);
                    console.log('Completed deploy');

                    if (deployTarget === 'prod') {
                        console.log('Merging main back into develop');
                        exec('git checkout develop; git merge main; git push;', (_error, stdout) => {
                            console.log(stdout);
                            console.log('develop is synced with main');
                        });
                    }
                });
            });
        });
    });
});
