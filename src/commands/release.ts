import { Arguments } from 'yargs';
import * as opn from 'opn';
import * as git from 'simple-git/promise';
import * as writePkg from 'write-pkg';

const productionBranchname = 'production';

const releaseCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const repository = git(process.cwd());
  const status = await repository.status();
  const version = command;

  const branchName = status.current;
  console.log(branchName);
  if (branchName === productionBranchname) {
    throw new Error(
      `Cannot create release for ${productionBranchname} branch.`,
    );
  } else if (branchName !== 'master') {
    console.error('WARNING: You should release from master branch.');
  }

  // Decide if it's major, minor or patch version change (ask user?)
  // (Use changelog to decide later?)

  // Checkout new branch `release-x.y.z`
  const releaseBranch = `release-${version}`;
  repository.checkoutLocalBranch(releaseBranch);

  // Writes version number in package.json
  writePkg({ version });

  const projectUrl = `https://github.com/${project.scope}/${project.name}`;
  const url = `${projectUrl}/compare/${productionBranchname}...${releaseBranch}`; // Use new branch name

  await opn(url, { wait: false });
};

export default releaseCommand;
