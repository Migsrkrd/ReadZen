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

export const UPDATE_USERNAME = gql`
  mutation updateUsername($id: ID!, $newUsername: String!) {
    updateUsername(id: $id, newUsername: $newUsername) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($id: ID!, $currentPassword: String!, $newPassword: String!) {
    updatePassword(id: $id, currentPassword: $currentPassword, newPassword: $newPassword) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
mutation deleteUser($id: ID!, $password: String!) {
  deleteUser(id: $id, password: $password) {
    user {
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
    $isPublished: Boolean,
    $isPinned: Boolean,
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


export const LIKE_README = gql`
mutation likeReadMe(
  $readMeId: String!
  ){
    likeReadMe(
      readMeId: $readMeId
      ){
      _id
      likes {
        _id
      }
    }
  }
`

export const UNLIKE_README = gql`
mutation unLikeReadMe(
  $readMeId: String!
  ){
    unLikeReadMe(
      readMeId: $readMeId
      ){
      _id
      likes {
        _id
      }
    }
  }
`

export const ADD_COMMENT = gql`
  mutation addComment(
    $readMeId: ID!,
    $text: String!,
    $author: String!,
  ) {
    addComment(
      readMeId: $readMeId,
      text: $text
      author: $author
    ) {
      _id
      text
      author
      dateCreated
    }
  }
`;
