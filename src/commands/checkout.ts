import { Arguments } from 'yargs';
import * as slugify from 'slugify';
import * as git from 'simple-git/promise';

import { getIssue } from '../github';

const checkoutCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const issueNumber = parseInt(command, 10);
  const issue = await getIssue(project, issueNumber, authToken);

  const slug = slugify(issue.title);
  console.log(slug);

  const repository = git(process.cwd());
  const gitStatus = await repository.status();
  console.log('checkout', gitStatus);
};

export default checkoutCommand;
