const core = require("@actions/core");
const aws = require('aws-sdk');

try {
    let AWS_ENVIRONMENT = core.getInput('AWS_ENVIRONMENT');
    let AWS_ACCESS_KEY_ID = null;
    let AWS_SECRET_ACCESS_KEY = null;
    let AWS_REGION = core.getInput("AWS_REGION");

    switch (AWS_ENVIRONMENT) {
        case "DEV": {
            AWS_ACCESS_KEY_ID = core.getInput("DEV_AWS_ACCESS_KEY_ID");
            AWS_SECRET_ACCESS_KEY = core.getInput("DEV_AWS_SECRET_ACCESS_KEY");
            break;
        }
        case "UAT": {
            AWS_ACCESS_KEY_ID = core.getInput("UAT_AWS_ACCESS_KEY_ID");
            AWS_SECRET_ACCESS_KEY = core.getInput("UAT_AWS_SECRET_ACCESS_KEY");
            break;
        }
        case "PROD": {
            AWS_ACCESS_KEY_ID = core.getInput("PROD_AWS_ACCESS_KEY_ID");
            AWS_SECRET_ACCESS_KEY = core.getInput("PROD_AWS_SECRET_ACCESS_KEY");
            break;
        }
        default: throw "Unknown environment '" + AWS_ENVIRONMENT + "'.";
    }

    console.log("AWS_ENVIRONMENT: " + AWS_ENVIRONMENT);
    console.log("AWS_ACCESS_KEY_ID: " + AWS_ACCESS_KEY_ID);
    console.log("AWS_SECRET_ACCESS_KEY: " + AWS_SECRET_ACCESS_KEY);
    console.log("AWS_REGION: " + AWS_REGION);

    core.setSecret(accessKeyId);
    core.exportVariable('AWS_ACCESS_KEY_ID', accessKeyId);
    core.setSecret(secretAccessKey);
    core.exportVariable('AWS_SECRET_ACCESS_KEY', secretAccessKey);
    core.exportVariable('AWS_DEFAULT_REGION', region);
    core.exportVariable('AWS_REGION', region);

    await validateCredentials(AWS_ACCESS_KEY_ID);
} catch (error) {
    console.log("error: ", error);
    core.setFailed(error.message);
}


function loadCredentials() {
    aws.config.credentials = null;

    return new Promise((resolve, reject) => {
        aws.config.getCredentials((err) => {
            if (err) {
                reject(err);
            }
            resolve(aws.config.credentials);
        })
    });
}

async function validateCredentials(expectedAccessKeyId) {
    let credentials;
    try {
        credentials = await loadCredentials();

        if (!credentials.accessKeyId) {
            throw new Error('Access key ID empty after loading credentials');
        }
    } catch (error) {
        throw new Error(`Credentials could not be loaded, please check your action inputs: ${error.message}`);
    }

    const actualAccessKeyId = credentials.accessKeyId;

    if (expectedAccessKeyId && expectedAccessKeyId != actualAccessKeyId) {
        throw new Error('Unexpected failure: Credentials loaded by the SDK do not match the access key ID configured by the action');
    }
}
