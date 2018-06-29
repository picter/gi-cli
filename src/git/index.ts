import * as git from 'simple-git/promise'; // tslint:disable-line no-submodule-imports
import * as slugify from 'slugify';
import * as commitsParser from 'conventional-commits-parser';
import * as changelogWriter from 'conventional-changelog-writer';
import * as through from 'through2';

interface Issue {
  number: number;
  state: string;
  title: string;
}

interface Commit {
  message: string;
  body: string;
}

export const slugifyTitle = (title: string) =>
  slugify(title, {
    lower: true,
    remove: /[$*_+~^,.()'"`!/\-:;@]/g,
  });

export const checkout = async (issue: Issue) => {
  const slug = slugifyTitle(issue.title);

  const branchName = `${issue.number}-${slug}`;

  const repository = git(process.cwd());

  await repository.checkoutLocalBranch(branchName);

  console.log('Checkout', branchName);
};

export const getChangeLog = async (base: string) => {
  return new Promise(async (resolve) => {
    const repository = git(process.cwd());
    const status = await repository.status();
    const log = await repository.log([`${base}..${status.current}`]);
    const upstream = through.obj();

    upstream
      .pipe(commitsParser())
      .pipe(changelogWriter())
      .on('data', (changelog: string) => {
        resolve(changelog);
      })

    log.all.forEach((commit: Commit) => {
      const commitText = [commit.message, commit.body].join('\n\n\n');
      upstream.write(commitText);
    });

    upstream.end();
  });
};
