import axios from 'axios';

const baseUrl = 'https://api.github.com';
const project = {
  scope: 'noxan',
  name: 'gi-cli',
};

const getIssues = async (authToken: any) => {
  const response = await axios.post(`${baseUrl}/graphql`, {
    query: `{
      repository(owner: "${project.scope}", name: "${project.name}") {
        issues(last: 100) {
          edges {
            node {
              number,
              title
            }
          }
        }
      }
    },`
  }, {
    headers: {
      Authorization: `bearer ${authToken}`,
    },
  });
  if (response.data) {
    return response.data.data.repository.issues.edges.map((node: any) => node.node);
  }
  return response;
}

const main = async () => {
  const issues = await getIssues(process.env.AUTH_TOKEN);
  console.log(issues.map((issue: any) => `${issue.number} - ${issue.title}`));
};

main();
