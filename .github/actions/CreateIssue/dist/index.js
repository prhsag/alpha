const core = require("@actions/core");
const Oktokit =require("octokit");

const octokit = new Octokit({ auth: process.env.TOKEN_PAT });

const createIssue  =async () => {
    try {
        const {data} = await octokit.rest.issues.create({
            owner: core.getInput("owner"),
            repo: core.getInput("repo_name"),
            title: core.getInput("title"),
            body: core.getInput("body"),
            assignee: core.getInput("assignees"),
            label: core.getInput("labels")

          });
        console.log("🚀 ~ file: index.ts:17 ~ createIssue ~ data:", data)
    } catch (error) {
        
        core.setFailed(error.message)
    }
}

createIssue()
