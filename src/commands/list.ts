import { getIssues } from '../github';

export default async (project: any, showAll: boolean, authToken: string) => {
  const issues = await getIssues(project, authToken);

  issues.map((issue: any) => {
    if (showAll || issue.state === 'OPEN') {
      console.log(`${issue.number} - ${issue.title}` + (showAll ? ` (${issue.state})` : ''));
    }
  });
};
