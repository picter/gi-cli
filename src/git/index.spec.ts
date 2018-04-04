import { slugifyTitle } from '.';

test('Convert regular issue title to branch name (slugify).', () => {
  expect(slugifyTitle('Sanitize branch name')).toEqual('sanitize-branch-name');
});
