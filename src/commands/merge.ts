import { Arguments } from 'yargs';
import * as opn from 'opn';
import * as git from 'simple-git/promise';

const pullRequestCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const repository = git(process.cwd());
  const status = await repository.status();

  const branchName = status.current;
  if (branchName === 'master') {
    throw new Error('Cannot create pull/merge request for master.');
  }
  const projectUrl = `https://github.com/${project.scope}/${project.name}`;
  const url = `${projectUrl}/compare/master...${branchName}`;

  console.log(url);
  await opn(url, { wait: false });
};

export default pullRequestCommand;
