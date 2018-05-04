import { Arguments } from 'yargs';
import * as git from 'simple-git/promise';
import * as opn from 'opn';
import * as readPkg from 'read-pkg';
import * as semver from 'semver';
import * as writePkg from 'write-pkg';

const productionBranchname = 'production';

const validateVersion = (version: string) =>
  !!semver.valid(version) || false;

const releaseCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const SEMVER_LEVELS = ['major', 'minor', 'patch'];
  const repository = git(process.cwd());
  const packageJson = await readPkg();
  const version = packageJson.version;
  const branchName = (await repository.status()).current;

  let versionIncrease: any = 'patch';
  if (args.major) {
    versionIncrease = 'major';
  } else if (args.minor) {
    versionIncrease = 'minor';
  }

  if (branchName === productionBranchname) {
    throw new Error(
      `Cannot create release for ${productionBranchname} branch.`,
    );
  } else if (branchName !== 'master') {
    console.error('WARNING: You should release from master branch.');
  }

  const nextVersion = semver.inc(version, versionIncrease);

  // Checkout new branch `release-x.y.z`
  const releaseBranch = `release-${nextVersion}`;
  repository.checkoutLocalBranch(releaseBranch);

  // Writes version number in package.json
  writePkg({ ...packageJson, version: nextVersion });

  await repository.add('package.json');
  // await repository.commit('package.json');

  const projectUrl = `https://github.com/${project.scope}/${project.name}`;
  const url = `${projectUrl}/compare/${productionBranchname}...${releaseBranch}`; // Use new branch name

  await opn(url, { wait: false });
};

export default releaseCommand;
