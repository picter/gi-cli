import * as yargs from 'yargs';

import { list as commandList, selectCommand } from './commands';
import { configPath, configFileExists, loadConfigFile } from './config';
import detectRemote from './remotes';

if (!configFileExists()) {
  throw new Error(`No config file found at ${configPath}.`);
}

const config = loadConfigFile();

const argv = yargs
  .usage('gi [command]')
  .command('<issue number>', 'Checkout branch for issue number.')
  .command('list', 'Lists all open issues of this project.', y =>
    y
      .option('all', { describe: 'Show all issues', default: false })
      .option('interactive', {
        alias: 'i',
        describe: 'Show interactive list',
        default: false,
      }),
  )
  .command(['pr', 'merge'], 'Create pull/merge request for current branch.')
  .command(['release'], 'Release current branch.', y =>
    y
      .option('major', {
        describe: 'Do a major version change.',
        default: false,
      })
      .option('minor', {
        describe: 'Do a minor version change.',
        default: false,
      })
      .option('patch', {
        describe: 'Do a patch version change.',
        default: true,
      }),
  )
  .help().argv;

const authToken = config['github.com'].token;

const main = async () => {
  const project = await detectRemote();

  const command = selectCommand(argv._[0]);

  command(argv._[0], project, argv, authToken);
};

main();
