import {getInput,setFailed,setOutput} from "@actions/core";
import * as github from '@actions/github';

async function createPullRequest() {
  const octokit=github.getOctokit(process.env.TOKEN_PAT as string)
  try {
  
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;

    const baseBranch = getInput('base-branch') || github.context.ref;
    const headBranch = getInput('main-branch') || 'main';
    const title = getInput('pull-request-title');
    const body = getInput('pull-request-body');

    const pullRequest = await octokit.rest.pulls.create({
      owner,
      repo,
      title,
      body,
      base: baseBranch,
      head: headBranch,
    });

    setOutput('pull-request-url', pullRequest.data.html_url);
  } catch (error) {
    setFailed((error as Error).message);
  }
}

createPullRequest();
