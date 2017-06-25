import axios from 'axios';

const baseUrl = 'https://api.github.com';
const project = 'noxan/gi-cli';

const getIssues = async () => {
  const response = await axios.get(`${baseUrl}/repos/${project}/issues`);
  return response.data;
}

const main = async () => {
  const issues = await getIssues();
  console.log(issues.map((issue: any) => `${issue.number} - ${issue.title}`));
};

main();
