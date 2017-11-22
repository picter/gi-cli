import { getIssues } from '../github';

const listCommand = async (
  command: string,
  project: any,
  showAll: boolean,
  authToken: string,
) => {
  const issues = await getIssues(project, authToken);

  issues.map((issue: any) => {
    if (showAll || issue.state === 'OPEN') {
      console.log(
        `${issue.number} - ${issue.title}` +
          (showAll ? ` (${issue.state})` : ''),
      );
    }
  });
};

export default listCommand;
