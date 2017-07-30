jest.mock('os');

const os = require('os');
os.homedir = jest.fn();
os.homedir.mockReturnValue('/Users/demo');

import { configPath } from '.';

test('Config path is within user home directory.', () => {
  expect(configPath).toEqual('/Users/demo/.gi.yaml');
});
