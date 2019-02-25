import checkout from './checkout';
import list from './list';
import merge from './merge';
import newCommand from './new';
import release from './release';
import unknown from './unknown';

export const selectCommand = (command: string) => {
  const commandUndefined = command == null || command.length === 0;

  if (commandUndefined || command === 'list') {
    return list;
  }

  if (command === 'merge' || command === 'pr') {
    return merge;
  }

  if (command === 'new') {
    return newCommand;
  }

  if (command === 'release') {
    return release;
  }

  // try to parse command as number for issue detection / checkout
  const issueNumber = parseInt(command, 10);
  if (isNaN(issueNumber) || issueNumber < 1) {
    return unknown;
  }

  return checkout;
};

export { list, checkout, merge, newCommand, release, unknown };
