import * as yargs from 'yargs';

import { list as commandList, selectCommand } from './commands';
import { configPath, configFileExists, loadConfigFile } from './config';
import detectRemote from './remotes';

if (!configFileExists()) {
  throw new Error(`No config file found at ${configPath}.`);
}

const config = loadConfigFile();

const argv = yargs
  .command(
    '$0 <issue number>',
    'Magic command, checkout branch for issue number.',
  )
  .command('$0 <>', 'Magic command, without issue number shortcut for list.')
  .command('list', 'Lists all open issues of this project.', y =>
    y.option('all', { describe: 'Show all issues', default: false }),
  )
  .command('merge', 'Create pull/merge request for current branch.')
  .help().argv;

const authToken = config['github.com'].token;

const main = async () => {
  const project = await detectRemote();

  const command = selectCommand(argv._[0]);

  command(argv._[0], project, argv, authToken);
};

main();
