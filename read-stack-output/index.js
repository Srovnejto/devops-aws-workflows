const core = require("@actions/core");
const AWS = require("aws-sdk");

var STACK_NAME = core.getInput('STACK_NAME');
var cloudFormation = new AWS.CloudFormation();
cloudFormation.describeStacks({ StackName: STACK_NAME }, (error, data) => {
    if (error) {
        console.log(error);
        core.setFailed("An error occured while reading stack output.");
    } else {
        data.Stacks[0].Outputs.forEach(output => {
            //core.exportVariable(STACK_NAME + "." + output.OutputKey, output.OutputValue);
            console.log(output.OutputKey + " = " + output.OutputValue);
            core.setOutput(output.OutputKey, output.OutputValue);
        })
    }
});
