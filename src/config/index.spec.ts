jest.mock('os');
jest.mock('fs');

const os = require('os');
os.homedir = jest.fn();
os.homedir.mockReturnValue('/Users/gi-demo-cf07295117d2');

const fs = require('fs');
fs.existsSync = jest.fn();
fs.existsSync.mockReturnValue(false);
fs.readFileSync = jest.fn();
fs.readFileSync.mockReturnValue(`
---
github.com: e971086be50a
`);

import { configPath, configFileExists, loadConfigFile } from '.';

test('Config path is within user home directory.', () => {
  expect(configPath).toEqual('/Users/gi-demo-cf07295117d2/.gi.yaml');
});

test('Check if config file exists.', () => {
  expect(configFileExists()).toBe(false);
});

test('Read config file and parse it.', () => {
  expect(loadConfigFile()).toEqual({
    'github.com': 'e971086be50a',
  });
});
