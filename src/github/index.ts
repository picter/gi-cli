import axios from 'axios';

import { baseUrl } from './config';

// tslint:disable-next-line interface-name
export interface GithubIssue {
  number: number;
  state: string;
  title: string;
}

export const createIssue = async (
  project: any,
  issueTitle: string,
  authToken: any,
) => {
  const response = await axios.post(
    `${baseUrl}/repos/${project.scope}/${project.name}/issues`,
    {
      title: issueTitle,
    },
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    },
  );
  if (response.data) {
    const issue = response.data;

    return {
      number: issue.number,
      state: issue.state,
      title: issue.title,
    };
  }
  throw new Error('No response from axios post request');
};

export const getIssues = async (project: any, authToken: any) => {
  const response = await axios.post(
    `${baseUrl}/graphql`,
    {
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
    },`,
    },
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    },
  );
  if (response.data) {
    return response.data.data.repository.issues.edges.map(
      (node: any): GithubIssue => node.node,
    );
  }
  return response;
};

export const getIssue = async (
  project: any,
  issueNumber: number,
  authToken: any,
) => {
  const response = await axios.post(
    `${baseUrl}/graphql`,
    {
      query: `{
      repository(owner: "${project.scope}", name: "${project.name}") {
        issue(number: ${issueNumber}) {
          number,
          state,
          title
        }
      }
    },`,
    },
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    },
  );
  if (response.data) {
    return response.data.data.repository.issue;
  }
  return response;
};
