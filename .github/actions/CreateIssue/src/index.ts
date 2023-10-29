import {getInput,setFailed} from "@actions/core";
import { getOctokit } from "@actions/github";

const octokit=getOctokit(process.env.TOKEN_PAT as string)

const createIssue  =async () => {
    try {
        const {data} = await octokit.rest.issues.create({
            owner: getInput("owner"),
            repo: getInput("repo_name"),
            title: getInput("title"),
            body: getInput("body"),
            assignee: getInput("assignees"),
            label: getInput("labels")

          });
        console.log("🚀 ~ file: index.ts:17 ~ createIssue ~ data:", data)
    } catch (error) {
        setFailed((error as Error)?.message ?? 'Unknown error');
    }
}

createIssue()
