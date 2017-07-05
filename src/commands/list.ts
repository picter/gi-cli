import { getIssues } from '../github';

export default async (project: any) =>  {
  const issues = await getIssues(project, process.env.AUTH_TOKEN);
  console.log(issues.map((issue: any) => `${issue.number} - ${issue.title}`));
};
