import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }  
    }  
  }  
`;  

export const UPDATE_USER = gql`
  mutation updateUser($userId: ID!, $newUsername: String!) {
    updateUser(userId: $userId, newUsername: $newUsername) {
      User {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
mutation deleteUser($userId: ID!) {
  deleteUser(userId: $userId) {
    User {
      _id
      username
    }
  }
}
`;

export const ADD_README = gql`
  mutation addReadMe(
    $title: String!,
    $description: String!,
    $tableOfContents: String,
    $installation: String,
    $usage: String,
    $credits: String,
    $license: String,
    $tests: String,
    $repoLink: String!,
    $deployedLink: String!,
    $datePublished: String,
    $isPublished: Boolean
    $isPinned: Boolean
    $markdown: String
  ) {
    addReadMe(
      title: $title,
      description: $description,
      tableOfContents: $tableOfContents,
      installation: $installation,
      usage: $usage,
      credits: $credits,
      license: $license,
      tests: $tests,
      repoLink: $repoLink,
      deployedLink: $deployedLink,
      datePublished: $datePublished,
      isPublished: $isPublished
      isPinned: $isPinned
      markdown: $markdown
    ) {
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
      isPinned
      markdown
      author 
    }
  }
`;

export const UPDATE_README = gql`
  mutation updateReadMe(
    $readMeId: ID!,
    $title: String,
    $description: String,
    $tableOfContents: String,
    $installation: String,
    $usage: String,
    $credits: String,
    $license: String,
    $tests: String,
    $repoLink: String,
    $deployedLink: String,
    $dateCreated: String,
    $datePublished: String,
    $isPublished: Boolean
    $markdown: String
  ) {
    updateReadMe(
      _id: $readMeId,
      title: $title,
      description: $description,
      tableOfContents: $tableOfContents,
      installation: $installation,
      usage: $usage,
      credits: $credits,
      license: $license,
      tests: $tests,
      repoLink: $repoLink,
      deployedLink: $deployedLink,
      dateCreated: $dateCreated,
      datePublished: $datePublished,
      isPublished: $isPublished
      markdown: $markdown
    ) {
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
      markdown
      author
    }
  }
`;

export const DELETE_README = gql`
  mutation deleteReadMe(
    $readMeId: ID!
  ) {
    deleteReadMe(_id: $readMeId) {
      _id
      title
    }
  }
`;
