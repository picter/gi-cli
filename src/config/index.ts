import { existsSync, readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';
import { homedir } from 'os';
import { join } from 'path';

export const configPath = join(homedir(), '.gi.yaml');

export const configFileExists = () => existsSync(configPath);

export const loadConfigFile = () => {
  const content = readFileSync(configPath, 'utf-8');
  return safeLoad(content);
};
