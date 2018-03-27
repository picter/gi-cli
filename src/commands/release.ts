import { Arguments } from 'yargs';

const releaseCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  console.log(`Release "${command}, ${args}".`);
};

export default releaseCommand;
