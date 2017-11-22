import list from './list';
import checkout from './checkout';
import pullRequest from './pull-request';
import unknown from './unknown';

export const selectCommand = (command: string) => {
  const commandUndefined = command == null || command.length === 0;

  if (commandUndefined || command === 'list') {
    return list;
  }

  if (command === 'merge') {
    return pullRequest;
  }

  // try to parse command as number for issue detection / checkout
  const issueNumber = parseInt(command, 10);
  if (isNaN(issueNumber) || issueNumber < 1) {
    return unknown;
  }

  return checkout;
};

export { default as list } from './list';
export { default as checkout } from './checkout';
export { default as pullRequest } from './pull-request';
export { default as unknown } from './unknown';
