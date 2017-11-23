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

const selectIssue = async (
  issues: Array<Object>,
  args: Arguments,
) => {
  const list = issues
    .filter((issue: any) => args.all || issue.state === 'OPEN')
    .map((issue: any) => ({
      name: `${issue.number} - ${issue.title}` +
        (args.all ? ` (${issue.state})` : ''),
      value: issue,
    }));

  const answers = await prompt([
    {
      type: 'list',
      name: 'issue',
      message: "Select issue:",
      paginated: true,
      choices: list
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
    return selectIssue(issues, args);
  }
  return printIssues(issues, args);
};

export default listCommand;
