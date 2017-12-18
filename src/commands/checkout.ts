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

  const slug = slugify(issue.title, {
    remove: /['",.\\\/~:;^]/g,
    lower: true,
  });
  
  const branchName = `${issue.number}-${slug}`;

  const repository = git(process.cwd());

  await repository.checkoutLocalBranch(branchName);

  console.log('Checkout', branchName);
};

export default checkoutCommand;
