import axios from 'axios';

import { baseUrl } from './config';

export const getIssues = async (project: any, authToken: any) => {
  const response = await axios.post(`${baseUrl}/graphql`, {
    query: `{
      repository(owner: "${project.scope}", name: "${project.name}") {
        issues(last: 100) {
          edges {
            node {
              number,
              state,
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
