import { getIssues } from '../github';

export default async (project: any, authToken: string) => {
  const issues = await getIssues(project, authToken);

  issues.map((issue: any) => {
    if (issue.state === 'OPEN') {
      console.log(`${issue.number} - ${issue.title}`);
    }
  });
};
