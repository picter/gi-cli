import { Arguments } from 'yargs';
import { checkout } from '../git';

import { getIssue } from '../github';

const checkoutCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const issueNumber = parseInt(command, 10);
  const issue = await getIssue(project, issueNumber, authToken);

  checkout(issue);
};

export default checkoutCommand;
