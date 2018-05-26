import { prompt } from 'inquirer';
import { Arguments } from 'yargs';

import { checkout } from '../git';
import { getIssues, getUserLogin, GithubIssue, GithubUser } from '../github';

const printIssues = (issues: GithubIssue[], args: Arguments) =>
  issues
    .filter((issue: any) => args.all || issue.state === 'OPEN')
    .map((issue: any) => {
      console.log(
        `${issue.number} - ${issue.title}` +
          (args.all ? ` (${issue.state})` : ''),
      );
    });

const printAssignedIssues = (
  issues: GithubIssue[],
  user: GithubUser,
  args: Arguments,
) => {
  issues
    .filter(
      (issue: any) =>
        (args.all || issue.state === 'OPEN') &&
        issue.assignees.some(
          (assignee: GithubUser) => assignee.login === user.login,
        ),
    )
    .map((issue: any) => {
      console.log(
        `${issue.number} - ${issue.title}` +
          (args.all ? ` (${issue.state})` : ''),
      );
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

  const answers: any = await prompt([
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
