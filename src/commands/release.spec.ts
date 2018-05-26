import { Arguments } from 'yargs';

import release from './release';

const version = '1.1.1';
const project = {
  name: 'project',
  scope: 'picter',
};
const productionBranch = 'release';
const argv = { _: [], $0: '', newVersion: '' };
const token = '';

// Initialize all necessary mock functions
const mockAdd = jest.fn();
const mockCheckoutLocalBranch = jest.fn();
const mockCommit = jest.fn();
const mockPush = jest.fn();
const mockWritePkg = jest.fn(() => Promise.resolve());
const mockReadPkg = jest.fn().mockResolvedValue({ version });
const mockOpn = jest.fn();
const mockStatus = jest.fn().mockResolvedValue({ current: 'master' });

// Register all necessary mock modules (from external packages)
jest.mock('write-pkg', () => (args: any) => mockWritePkg(args));
jest.mock('read-pkg', () => () => mockReadPkg());
jest.mock('opn', () => (url: string) => mockOpn(url));
jest.mock('simple-git/promise', () => (pwd: string) => {
  return {
    add: mockAdd,
    checkoutLocalBranch: mockCheckoutLocalBranch,
    commit: mockCommit,
    push: mockPush,
    status: mockStatus,
  };
});

describe('release command', () => {
  // TODO: Complete this tests, could not make it work
  // You can use to mock the different branches
  //    - .mockResolvedValueOnce({ current: productionBranch })
  //    - .mockResolvedValueOnce({ current: 'random' })
  // it('throws an error when executed inside the release branch', () => {});
  // it('shows a warning message when not executed inside the master branch', () => {});

  describe('when receives a specific version number', () => {
    const releaseBranch = `release-${version}`;

    beforeAll(() => {
      argv.newVersion = version;
      release('release', project, argv, token);
    });

    it('creates a new branch with "release-1.1.1"', () => {
      expect(mockCheckoutLocalBranch).toHaveBeenCalledWith(releaseBranch);
    });

    it('writes the version to package.json', () => {
      const packageJson = { version };
      expect(mockWritePkg).toHaveBeenCalledWith(packageJson);
    });

    it('calls "opn" with the pull request url', () => {
      expect(mockOpn).toMatchSnapshot();
    });

    it('adds "package.json" to staging', () => {
      expect(mockAdd).toHaveBeenCalledWith('package.json');
    });

    it(`commits with "Release v1.1.1" message`, () => {
      expect(mockCommit).toHaveBeenCalledWith(`Release v${version}`);
    });
  });

  describe('when called with major, minor or patch level', () => {
    const majorVersion = '2.0.0';
    const releaseBranch = `release-${majorVersion}`;

    beforeAll(() => {
      argv.newVersion = 'major';
      release('release', project, argv, token);
    });

    it(`creates a new branch with "release-2.0.0"`, () => {
      expect(mockCheckoutLocalBranch).toHaveBeenCalledWith(releaseBranch);
    });

    it('writes the version to package.json', () => {
      const packageJson = { version: majorVersion };
      expect(mockWritePkg).toHaveBeenCalledWith(packageJson);
    });

    it('calls "opn" with the pull request url', () => {
      expect(mockOpn).toMatchSnapshot();
    });

    it('adds "package.json" to staging', () => {
      expect(mockAdd).toHaveBeenCalledWith('package.json');
    });

    it(`commits with "Release v2.0.0" message`, () => {
      expect(mockCommit).toHaveBeenCalledWith(`Release v${majorVersion}`);
    });
  });
});
