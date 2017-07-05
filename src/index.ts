import { getIssues } from './github';

const project = {
  scope: 'noxan',
  name: 'gi-cli',
};

const main = async () => {
  const issues = await getIssues(project, process.env.AUTH_TOKEN);
  console.log(issues.map((issue: any) => `${issue.number} - ${issue.title}`));
};

main();
