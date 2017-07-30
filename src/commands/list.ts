import { getIssues } from '../github';

export default async (project: any, authToken: string) =>  {
  const issues = await getIssues(project, authToken);
  console.log(issues.map((issue: any) => `${issue.number} - ${issue.title}`));
};
