import * as yargs from 'yargs';

import { getIssues } from './github';

const argv = yargs
  .command('test', 'Testing')
  .help()
  .argv;

const command = argv._[0] || 'list';

const project = {
  scope: 'noxan',
  name: 'gi-cli',
};

const main = async () => {
  const issues = await getIssues(project, process.env.AUTH_TOKEN);
  console.log(issues.map((issue: any) => `${issue.number} - ${issue.title}`));
};

main();

console.log(command);
