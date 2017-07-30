jest.mock('os');

const os = require('os');
os.homedir = jest.fn();
os.homedir.mockReturnValue('/Users/gi-demo-cf07295117d2');

import { configPath, configFileExists } from '.';

test('Config path is within user home directory.', () => {
  expect(configPath).toEqual('/Users/gi-demo-cf07295117d2/.gi.yaml');
});

test('Check if config file exists.', () => {
  expect(configFileExists()).toBe(false);
});
