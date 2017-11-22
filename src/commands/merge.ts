import { Arguments } from 'yargs';

const pullRequestCommand = async (
  command: string,
  project: any,
  args: Arguments,
  authToken: string,
) => {
  const branchName = 'branchName';
  const projectUrl = `https://github.com/${project.scope}/${project.name}`;
  const url = `${projectUrl}/compare/master...${branchName}`;

  console.log(url);
};

export default pullRequestCommand;
