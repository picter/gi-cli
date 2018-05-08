jest.mock('os');
jest.mock('fs');

const os = require('os'); // tslint:disable-line no-var-requires
os.homedir = jest.fn();
os.homedir.mockReturnValue('/Users/gi-demo-cf07295117d2');

const fs = require('fs'); // tslint:disable-line no-var-requires
fs.existsSync = jest.fn();
fs.existsSync.mockReturnValue(false);
fs.readFileSync = jest.fn();
fs.readFileSync.mockReturnValue(`
---
github.com:
  token: e971086be50a
`);

import { configFileExists, configPath, loadConfigFile } from '.';

test('Config path is within user home directory.', () => {
  expect(configPath).toEqual('/Users/gi-demo-cf07295117d2/.gi.yaml');
});

test('Check if config file exists.', () => {
  expect(configFileExists()).toBe(false);
});

test('Read config file and parse it.', () => {
  expect(loadConfigFile()).toEqual({
    'github.com': { token: 'e971086be50a' },
  });
});
