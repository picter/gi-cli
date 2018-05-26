import axios from 'axios';

import { baseUrl } from './config';

// tslint:disable-next-line interface-name
export interface GithubUser {
  login: string;
}

// tslint:disable-next-line interface-name
export interface GithubIssue {
  number: number;
  state: string;
  title: string;
  assignees: GithubUser[];
}

export const getUserLogin = async (authToken: any) => {
  const response = await axios.post(
    `${baseUrl}/graphql`,
    {
      query: `{
        viewer {
          login
        }
      }`,
    },
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    },
  );
  if (response.data) {
    return response.data.data.viewer;
  }
  return response;
};

export const getIssues = async (project: any, authToken: any) => {
  const response = await axios.post(
    `${baseUrl}/graphql`,
    {
      query: `{
        repository(owner: "${project.scope}", name: "${project.name}") {
          issues(last: 100) {
            nodes {
              number,
              state,
              title
              assignees(last: 100) {
                nodes {
                  login
                }
              }
            }
          }
        }
      }`,
    },
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    },
  );
  if (response.data) {
    return response.data.data.repository.issues.nodes.map(
      (node: any): GithubIssue => ({
        ...node,
        assignees: node.assignees.nodes.map(
          (assignee: any): GithubUser => assignee,
        ),
      }),
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
