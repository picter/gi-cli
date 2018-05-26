import * as git from 'simple-git/promise'; // tslint:disable-line no-submodule-imports
import * as slugify from 'slugify';

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
