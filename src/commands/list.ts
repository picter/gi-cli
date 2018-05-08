import { Arguments } from 'yargs';
import { prompt } from 'inquirer';
import { getIssues } from '../github';
import { checkout } from '../git';

const printIssues = (
  issues: Array<Object>,
  args: Arguments,
) => {
  issues.map((issue: any) => {
    if (args.all || issue.state === 'OPEN') {
      console.log(
        `${issue.number} - ${issue.title}` +
          (args.all ? ` (${issue.state})` : ''),
      );
    }
  });
}

const showIssueSelector = async (
  issues: Array<Object>,
  args: Arguments,
) => {
  const choices = issues
    .filter((issue: any) => args.all || issue.state === 'OPEN')
    .map((issue: any) => ({
      name: `${issue.number} - ${issue.title}` +
        (args.all ? ` (${issue.state})` : ''),
      value: issue,
    }));

  const answers: any = await prompt([
    {
      type: 'list',
      name: 'issue',
      message: "Checkout branch for issue:",
      paginated: true,
      choices
    }
  ]);

  return checkout(answers.issue);
}

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
