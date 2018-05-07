import { Arguments } from 'yargs';
import * as git from 'simple-git/promise';
import * as opn from 'opn';
import * as readPkg from 'read-pkg';
import * as semver from 'semver';
import * as writePkg from 'write-pkg';

const productionBranchname = 'release';

const releaseCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const SEMVER_LEVELS: Array<String> = ['major', 'minor', 'patch'];
  const repository = git(process.cwd());
  const packageJson = await readPkg();
  const branchName = (await repository.status()).current;

  if (branchName === productionBranchname) {
    throw new Error(
      `Cannot create release for "${productionBranchname}" branch.`,
    );
  } else if (branchName !== 'master') {
    console.error('WARNING: You should release from master branch.');
  }

  let versionIncrease = args.newVersion;

  if (SEMVER_LEVELS.includes(versionIncrease)) {
    versionIncrease = semver.inc(packageJson.version, versionIncrease);
  }

  if (!semver.valid(versionIncrease)) {
    throw new Error(
      `Version "${versionIncrease}" does not comply with Semver.`,
    );
  }

  // Checkout new branch `release-x.y.z`
  const releaseBranch = `release-${versionIncrease}`;
  repository.checkoutLocalBranch(releaseBranch);

  // Writes version number in package.json
  packageJson.version = versionIncrease;
  await writePkg(packageJson);

  await repository.add('package.json');
  await repository.commit(`Release v${versionIncrease}`);
  await repository.push('origin', releaseBranch, { '--set-upstream': true });

  const projectUrl = `https://github.com/${project.scope}/${project.name}`;
  const url = `${projectUrl}/compare/${productionBranchname}...${releaseBranch}`; // Use new branch name

  await opn(url, { wait: false });
};

export default releaseCommand;
