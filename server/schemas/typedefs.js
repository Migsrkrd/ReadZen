const typedefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    ReadMes: [ReadMe]
}

type ReadMe {
    _id: ID!
    title: String!
    shortDescription: String
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
    author: String
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
    readmes(username: String): [ReadMe]
    readme(_id: ID!): ReadMe
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
    ): ReadMe
}
`;

module.exports = typedefs;
