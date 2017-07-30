import * as yargs from 'yargs';

import { list as commandList } from './commands';
import { configPath, configFileExists, loadConfigFile } from './config';

if (!configFileExists()) {
  throw new Error(`No config file found at ${configPath}.`);
}

const argv = yargs
  .command('list', 'Lists all open issues of this project.')
  .help()
  .argv;

const command = argv._[0] || 'list';

const project = {
  scope: 'noxan',
  name: 'gi-cli',
};

switch(command) {
  case 'list':
    commandList(project);
    break;
  default:
    console.log(`Unkown command "${command}".`);
    break;
}
