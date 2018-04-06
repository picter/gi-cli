import { Arguments } from 'yargs';

import release from './release';

const mockCheckoutLocalBranch = jest.fn();
jest.mock('simple-git/promise', () => (pwd: string) => {
  return {
    status: jest
      .fn()
      .mockResolvedValueOnce({ current: 'master' })
      .mockResolvedValueOnce({ current: 'production' })
      .mockResolvedValueOnce({ current: 'random' }),
    checkoutLocalBranch: mockCheckoutLocalBranch,
  };
});


const mockWritePkg = jest.fn(() => Promise.resolve());
jest.mock('write-pkg', () => (args: any) => mockWritePkg(args));

const mockOpn = jest.fn();
jest.mock('opn', () => (url: string) => mockOpn(url));

const buildPullRequestUrl = (
  project: any,
  productionBranch: string,
  releaseBranch: string,
) =>
  `https://github.com/${project.scope}/${
    project.name
  }/compare/${productionBranch}...${releaseBranch}`;

describe('release command', () => {
  const project = {
    name: 'project',
    scope: 'picter',
  };
  const argv = { _: [], $0: '' };
  const token = '';

  describe('when receives a specific version number', () => {
    const version = '1.1.1';
    const releaseBranch = `release-${version}`;

    beforeAll(() => {
      release(version, project, argv, token);
    });

    it('creates a new branch with "release-x.y.z"', () => {
      expect(mockCheckoutLocalBranch).toHaveBeenCalledWith(releaseBranch);
    });

    it('writes the version to package.json', () => {
      const packageJson = { version };
      expect(mockWritePkg).toHaveBeenCalledWith(packageJson);
    });

    it('calls "opn" with the pull request url', () => {
      const pullRequestUrl = buildPullRequestUrl(project, 'production', releaseBranch);
      expect(mockOpn).toHaveBeenCalledWith(pullRequestUrl);
    });
  });
});
