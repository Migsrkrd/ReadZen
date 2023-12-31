const typedefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    readMes: [ReadMe]
    likes: [ReadMe]
}

type ReadMe {
    _id: ID!
    title: String
    description: String!
    tableOfContents: String
    installation: String
    usage: String
    credits: String
    license: String
    tests: String
    repoLink: String!
    deployedLink: String!
    dateCreated: String!
    datePublished: String
    isPublished: Boolean
    isPinned: Boolean
    markdown: String
    author: String
    likeCount: Int
}

type Comment {
    _id: ID!
    readMeId: ID!
    author: String!
    text: String!
    dateCreated: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    allreadmes: [ReadMe]
    publishedReadmes: [ReadMe]
    searchReadmes(query: String): [ReadMe]
    readmes(username: String): [ReadMe]
    readme(_id: ID!): ReadMe
    comments(readMeId: String!): [Comment]
}

type Mutation {
    login(
        email: String!,
        password: String!
    ): Auth
    addUser(
        username: String!,
        email: String!,
        password: String!
    ): Auth
    updateUsername(
        id: ID!
        newUsername: String!,
    ): Auth
    updatePassword(
        id: ID!,
        currentPassword: String!,
        newPassword: String!
    ): Auth
    deleteUser(
        id: ID!,
        password: String!,
    ): Auth
    updateReadMe(
        _id: ID!,
        title: String,
        description: String,
        tableOfContents: String,
        installation: String,
        usage: String,
        credits: String,
        license: String,
        tests: String,
        repoLink: String,
        deployedLink: String,
        dateCreated: String,
        datePublished: String,
        isPublished: Boolean
        isPinned: Boolean
        markdown: String
    ): ReadMe
    deleteReadMe(
        _id: ID!
    ): ReadMe
    addReadMe(
        title: String!,
        description: String!,
        tableOfContents: String,
        installation: String,
        usage: String,
        credits: String,
        license: String,
        tests: String,
        repoLink: String!,
        deployedLink: String!
        dateCreated: String,
        datePublished: String,
        isPublished: Boolean
        isPinned: Boolean
        markdown: String
    ): ReadMe
    likeReadMe(
        readMeId: String!
    ): User
    unLikeReadMe(
        readMeId: String!
    ): User
    addComment(
        readMeId: ID!
        author: String!,
        text: String!,
        dateCreated: String
    ): Comment
    updateComment(
        _id: ID!
        readMeId: ID!
        author: String,
        text: String,
        dateCreated: String
    ): Comment
    deleteComment(
        _id: ID!
    ): ReadMe
}
`;

module.exports = typedefs;
