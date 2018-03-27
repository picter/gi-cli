import { Arguments } from 'yargs';
import * as opn from 'opn';
import * as git from 'simple-git/promise';

const releaseCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const repository = git(process.cwd());
  const status = await repository.status();

  const branchName = status.current;
  if (branchName === 'release') {
    throw new Error('Cannot create release for release branch.');
  } else if (branchName !== 'master') {
    console.error('WARNING: You should release from master branch.');
  }

  const projectUrl = `https://github.com/${project.scope}/${project.name}`;
  const url = `${projectUrl}/compare/release...${branchName}`;

  console.log(url);
  await opn(url, { wait: false });
};

export default releaseCommand;
