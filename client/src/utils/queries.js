import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      ReadMes {
        _id
        title
        createdAt
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUser($userId: ID!) {
    user(_id: $userId) {
      _id
      username
      email
      ReadMes {
        _id
        title
        createdAt
      }
    }
  }
`;

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      ReadMes {
        _id
        title
        createdAt
      }
    }
  }
`;

export const GET_READMES = gql`
  query getReadMes {
    readmes {
      _id
      title
      description
      createdAt
    }
  }
`;

export const GET_README_BY_ID = gql`
  query getReadMe($readMeId: ID!) {
    readme(_id: $readMeId) {
      _id
      title
      description
      TableOfContents
      Installation
      Usage
      Credits
      License
      Tests
      RepoLink
      DeployedLink
      author {
        _id
        username
      }
    }
  }
`;
