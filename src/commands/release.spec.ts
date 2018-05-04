import { Arguments } from 'yargs';

import release from './release';

const mockAdd = jest.fn();
const mockCheckoutLocalBranch = jest.fn();
const mockCommit = jest.fn();
const mockPush = jest.fn();
jest.mock('simple-git/promise', () => (pwd: string) => {
  return {
    add: mockAdd,
    checkoutLocalBranch: mockCheckoutLocalBranch,
    commit: mockCommit,
    push: mockPush,
    status: jest
      .fn()
      .mockResolvedValueOnce({ current: 'master' })
      .mockResolvedValueOnce({ current: 'production' })
      .mockResolvedValueOnce({ current: 'random' }),
  };
});

const version = '1.1.1';

const mockWritePkg = jest.fn(() => Promise.resolve());
jest.mock('write-pkg', () => (args: any) => mockWritePkg(args));

const mockReadPkg = jest.fn().mockResolvedValue({ version });
jest.mock('read-pkg', () => () => mockReadPkg());

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

const project = {
  name: 'project',
  scope: 'picter',
};
const productionBranch = 'release';
const argv = { _: [], $0: '', newVersion: '' };
const token = '';

describe('release command', () => {
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
      const pullRequestUrl = buildPullRequestUrl(
        project,
        productionBranch,
        releaseBranch,
      );
      expect(mockOpn).toHaveBeenCalledWith(pullRequestUrl);
    });

    it('adds "package.json" to staging', () => {
      expect(mockAdd).toHaveBeenCalledWith('package.json');
    });

    it(`commits with "Release v1.1.1" message`, () => {
      expect(mockCommit).toHaveBeenCalledWith(`Release v${version}`);
    });

    afterAll(() => {
      mockCheckoutLocalBranch.mockClear();
      mockOpn.mockClear();
      mockWritePkg.mockClear();
    });
  });

  describe('when called with semver', () => {
    describe('major level', () => {
      const majorVersion = '2.0.0';
      const releaseBranch = `release-${majorVersion}`;

      beforeAll(() => {
        argv.version = majorVersion;
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
        const pullRequestUrl = buildPullRequestUrl(
          project,
          'production',
          releaseBranch,
        );
        expect(mockOpn).toHaveBeenCalledWith(pullRequestUrl);
      });

      it('adds "package.json" to staging', () => {
        expect(mockAdd).toHaveBeenCalledWith('package.json');
      });

      it(`commits with "Release v2.0.0" message`, () => {
        expect(mockCommit).toHaveBeenCalledWith(`Release v${majorVersion}`);
      });

      afterAll(() => {
        mockCheckoutLocalBranch.mockClear();
        mockOpn.mockClear();
        mockWritePkg.mockClear();
      });
    });

    describe('minor level', () => {
      const minorVersion = '1.2.0';
      const releaseBranch = `release-${minorVersion}`;

      beforeAll(() => {
        argv.version = minorVersion;
        release('release', project, argv, token);
      });

      it(`creates a new branch with "release-1.2.0"`, () => {
        expect(mockCheckoutLocalBranch).toHaveBeenCalledWith(releaseBranch);
      });

      it('writes the version to package.json', () => {
        const packageJson = { version: minorVersion };
        expect(mockWritePkg).toHaveBeenCalledWith(packageJson);
      });

      it('calls "opn" with the pull request url', () => {
        const pullRequestUrl = buildPullRequestUrl(
          project,
          'production',
          releaseBranch,
        );
        expect(mockOpn).toHaveBeenCalledWith(pullRequestUrl);
      });

      it('adds "package.json" to staging', () => {
        expect(mockAdd).toHaveBeenCalledWith('package.json');
      });

      it(`commits with "Release v1.2.0" message`, () => {
        expect(mockCommit).toHaveBeenCalledWith(`Release v${minorVersion}`);
      });
    });

    describe('patch level', () => {
      const patchVersion = '1.1.2';
      const releaseBranch = `release-${patchVersion}`;

      beforeAll(() => {
        argv.version = patchVersion;
        release('release', project, argv, token);
      });

      it(`creates a new branch with "release-1.1.2"`, () => {
        expect(mockCheckoutLocalBranch).toHaveBeenCalledWith(releaseBranch);
      });

      it('writes the version to package.json', () => {
        const packageJson = { version: patchVersion };
        expect(mockWritePkg).toHaveBeenCalledWith(packageJson);
      });

      it('calls "opn" with the pull request url', () => {
        const pullRequestUrl = buildPullRequestUrl(
          project,
          'production',
          releaseBranch,
        );
        expect(mockOpn).toHaveBeenCalledWith(pullRequestUrl);
      });

      it('adds "package.json" to staging', () => {
        expect(mockAdd).toHaveBeenCalledWith('package.json');
      });

      it(`commits with "Release v${version}" message`, () => {
        expect(mockCommit).toHaveBeenCalledWith(`Release v${patchVersion}`);
      });
    });
  });
});
