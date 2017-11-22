import { getRemoteUrl } from './package';

export const extractFromRemoteUrl = (remoteUrl: string) => {
  const strippedRemoteUrl = remoteUrl.split(':').pop() || remoteUrl;
  const parts = strippedRemoteUrl.replace(/\.git$/, '').split('/');
  return {
    name: parts.pop(),
    scope: parts.pop(),
  };
};

export default async () => {
  const remoteUrl = await getRemoteUrl();

  return extractFromRemoteUrl(remoteUrl);
};
