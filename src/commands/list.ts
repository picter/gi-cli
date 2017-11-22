import { Arguments } from 'yargs';

import { getIssues } from '../github';

const listCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const issues = await getIssues(project, authToken);

  issues.map((issue: any) => {
    if (args.all || issue.state === 'OPEN') {
      console.log(
        `${issue.number} - ${issue.title}` +
          (args.all ? ` (${issue.state})` : ''),
      );
    }
  });
};

export default listCommand;
