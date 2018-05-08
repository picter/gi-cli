import { prompt } from 'inquirer';
import { Arguments } from 'yargs';

import { checkout } from '../git';
import { getIssues, GithubIssue } from '../github';

const printIssues = (issues: GithubIssue[], args: Arguments) => {
  issues.map((issue: any) => {
    if (args.all || issue.state === 'OPEN') {
      console.log(
        `${issue.number} - ${issue.title}` +
          (args.all ? ` (${issue.state})` : ''),
      );
    }
  });
};

const showIssueSelector = async (issues: GithubIssue[], args: Arguments) => {
  const choices = issues
    .filter((issue: any) => args.all || issue.state === 'OPEN')
    .map((issue: any) => ({
      name:
        `${issue.number} - ${issue.title}` +
        (args.all ? ` (${issue.state})` : ''),
      value: issue,
    }));

  const answers = await prompt([
    {
      choices,
      message: 'Checkout branch for issue:',
      name: 'issue',
      paginated: true,
      type: 'list',
    },
  ]);

  return checkout(answers.issue);
};

const listCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const issues = await getIssues(project, authToken);
  if (args.interactive) {
    return showIssueSelector(issues, args);
  }
  return printIssues(issues, args);
};

export default listCommand;
