const core = require("@actions/core");

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
    core.exportVariable('AWS_ENVIRONMENT', AWS_ENVIRONMENT);

    console.log("AWS_ACCESS_KEY_ID: " + AWS_ACCESS_KEY_ID);
    core.exportVariable('AWS_ACCESS_KEY_ID', AWS_ACCESS_KEY_ID);

    console.log("AWS_SECRET_ACCESS_KEY: " + AWS_SECRET_ACCESS_KEY);
    core.exportVariable('AWS_SECRET_ACCESS_KEY', AWS_SECRET_ACCESS_KEY);

    console.log("AWS_REGION: " + AWS_REGION);
    core.exportVariable('AWS_DEFAULT_REGION', AWS_REGION);
    core.exportVariable('AWS_REGION', AWS_REGION);
} catch (error) {
    console.log("error: ", error);
    core.setFailed(error.message);
}