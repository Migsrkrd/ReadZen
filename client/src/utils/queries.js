import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
      readMes {
        _id
        title
        shortDescription
        dateCreated
        isPublished
        datePublished
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
      readMes {
        _id
        title
        shortDescription
        dateCreated
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
      readMes {
        _id
        title
        shortDescription
        dateCreated
        isPublished
        datePublished
      }
    }
  }
`;

export const GET_ALL_READMES = gql`
  query getAllReadMes {
    publishedReadmes {
      _id
      title
      description
      repoLink
      deployedLink
      isPublished
      datePublished
      author
    }
  }`


export const GET_READMES = gql`
  query getReadMes($username: String) {
    readmes(username:  $username) {
      _id
      title
      description
      tableOfContents
      installation
      usage
      credits
      license
      tests
      repoLink
      deployedLink
      dateCreated
      datePublished
      isPublished
      author
    }
  }
`;

export const GET_README_BY_ID = gql`
  query getReadMe($readMeId: ID!) {
    readMe(_id: $readMeId) {
      _id
      title
      shortDescription
      description
      tableOfContents
      installation
      usage
      credits
      license
      tests
      repoLink
      deployedLink
      dateCreated
      datePublished
      isPublished
      author {
        _id
        username
      }
    }
  }
`;
