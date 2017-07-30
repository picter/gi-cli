import { existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export const configPath = join(homedir(), '.gi.yaml');

export const configFileExists = () => existsSync(configPath);
