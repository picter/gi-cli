import * as git from 'simple-git/promise'; // tslint:disable-line no-submodule-imports
import * as slugify from 'slugify';
import * as commitsParser from 'conventional-commits-parser';

interface Issue {
  number: number;
  state: string;
  title: string;
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
  const repository = git(process.cwd());
  const status = await repository.status();
  const log = await repository.log([`${base}..${status.current}`]);

  console.log(log);

  const commits = log
    .all
    .map((c: any) => [c.message, c.body].join('\n\n\n'))
    .map(commitsParser.sync);

  return commits;
};
