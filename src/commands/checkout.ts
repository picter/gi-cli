import { Arguments } from 'yargs';

const checkoutCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  console.log('checkout');
};

export default checkoutCommand;
