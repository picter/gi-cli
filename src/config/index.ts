import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';
import { safeLoad } from 'js-yaml';

export const configPath = join(homedir(), '.gi.yaml');

export const configFileExists = () => existsSync(configPath);

export const loadConfigFile = () => {
  const content = readFileSync(configPath, 'utf-8');
  return safeLoad(content);
};
