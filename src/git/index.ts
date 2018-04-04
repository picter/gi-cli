import * as slugify from 'slugify';
import * as git from 'simple-git/promise';

interface Issue {
  number: number;
  state: string;
  title: string;
}

export const slugifyTitle = (title: string) =>
  slugify(title, {
    remove: /['",.\\\/~:;^]/g,
    lower: true,
  });

export const checkout = async (issue: Issue) => {
  const slug = slugifyTitle(issue.title);

  const branchName = `${issue.number}-${slug}`;

  const repository = git(process.cwd());

  await repository.checkoutLocalBranch(branchName);

  console.log('Checkout', branchName);
};
