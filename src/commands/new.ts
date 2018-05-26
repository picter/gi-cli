import * as opn from 'opn';
import { Arguments } from 'yargs';

import { createIssue, getIssues, GithubIssue } from '../github';

const newCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const issue: GithubIssue = await createIssue(args.issueTitle);
  const url = `https://github.com/${project.scope}/${project.name}/issues/${
    issue.number
  }`;

  console.log(url);
  await opn(url, { wait: false });
};

export default newCommand;
