import { getInput, setFailed, setOutput } from "@actions/core";

if ( getInput('proceed')=="true" ) {
    console.log(`Status is GO (${getInput('proceed')})`);
} else {
    setFailed(`Status is NO GO (${getInput('proceed')})`);
}