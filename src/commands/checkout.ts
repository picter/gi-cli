import { Arguments } from 'yargs';
import * as slugify from 'slugify';

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
};

export default checkoutCommand;
