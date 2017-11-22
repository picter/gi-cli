import { getRemoteUrl } from './package';

export default async () => {
  const remote = await getRemoteUrl();

  console.log(remote);

  return {
    scope: 'noxan',
    name: 'gi-cli',
  };
};
