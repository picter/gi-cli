import { extractFromRemoteUrl } from '.';

// https://docs.npmjs.com/files/package.json#repository

test('Extract project from own remote url.', () => {
  expect(
    extractFromRemoteUrl('git+https://github.com/noxan/gi-cli.git'),
  ).toEqual({ name: 'gi-cli', scope: 'noxan' });
});

test('Extract project from remote url (git@gitlab.com:picter/gitlab-cli.git).', () => {
  expect(extractFromRemoteUrl('git@gitlab.com:picter/gitlab-cli.git')).toEqual({
    name: 'gitlab-cli',
    scope: 'picter',
  });
});
