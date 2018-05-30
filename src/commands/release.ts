import chalk from 'chalk';
import { prompt } from 'inquirer';
import * as opn from 'opn';
import * as readPkg from 'read-pkg';
import * as semver from 'semver';
import * as git from 'simple-git/promise'; // tslint:disable-line no-submodule-imports
import * as writePkg from 'write-pkg';
import { Arguments } from 'yargs';

const productionBranch = 'release';

const releaseCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const SEMVER_LEVELS: string[] = ['major', 'minor', 'patch'];
  const repository = git(process.cwd());
  const packageJson = await readPkg({ normalize: false });
  const branch = (await repository.status()).current;
  if (branch === productionBranch) {
    throw new Error(`Cannot create release for "${productionBranch}" branch.`);
  } else if (branch !== 'master') {
    console.error(chalk.red('WARNING: You should release from master branch.'));
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

  const releaseBranch = `release-${versionIncrease}`;

  console.log(chalk`
    {underline Release will do the following:}

    1. Create local {yellow branch}: {green "${releaseBranch}"}.
    2. Bump {yellow package.json version}: {green "${versionIncrease}"}.
    3. Create new {yellow commit}: {green "Release v${versionIncrease}"}.
    4. Push to {yellow remote repository}.
    5. Open a {yellow pull request} url: {green "${productionBranch}...${releaseBranch}"}.
  `);

  const answers: any = await prompt([
    {
      default: false,
      message: 'Wish to continue?',
      name: 'execute',
      type: 'confirm',
    },
  ]);

  if (answers.execute) {
    // Checkout new branch `release-x.y.z`
    repository.checkoutLocalBranch(releaseBranch);

    // Writes version number in package.json
    packageJson.version = versionIncrease;
    await writePkg(packageJson);

    await repository.add('package.json');
    await repository.commit(`Release v${versionIncrease}`);
    await repository.push('origin', releaseBranch, { '--set-upstream': true });

    const projectUrl = `https://github.com/${project.scope}/${project.name}`;
    const url = `${projectUrl}/compare/${productionBranch}...${releaseBranch}`; // Use new branch name

    await opn(url, { wait: false });
  }
};

export default releaseCommand;
