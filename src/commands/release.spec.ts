import { Arguments } from 'yargs';

import release from './release';

jest.mock('simple-git/promise', () => ((pwd: string) => {
  return {
    status: jest.fn()
    .mockResolvedValueOnce({ current: 'master' })
    .mockResolvedValueOnce({ current: 'production' })
    .mockResolvedValueOnce({ current: 'random' })
  };
}));

const mockOpn = jest.fn().mockResolvedValueOnce('try');
jest.mock('opn', () => ((url: string) => mockOpn));

describe('release command', () => {
  const project = 'arbitrary-project';
  const argv = { _: [], $0: '' };
  const token = '';

  describe('when receives a specific version number', () => {
    const version = '1.1.1';
    release(version, project, argv, token);

    it('creates a new branch with "release-x.y.z"', () => {});
    it('writes the version to package.json', () => {});
    it('calls "opn" with the pull request url', () => {});
  });
});
