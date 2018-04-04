import { slugifyTitle } from '.';

test('Convert regular issue title to branch name (slugify).', () => {
  expect(slugifyTitle('Sanitize branch name')).toEqual('sanitize-branch-name');
});

test('Convert issue title with ` to branch name (slugify).', () => {
  expect(
    slugifyTitle(
      'Implement flag props like `nopaddings` and `nomargins` on text components',
    ),
  ).toEqual(
    'implement-flag-props-like-nopaddings-and-nomargins-on-text-components',
  );
});
