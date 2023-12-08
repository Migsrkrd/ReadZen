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
    description: String!
    TableOfContents: String
    Installation: String
    Usage: String
    Credits: String
    License: String
    Tests: String
    RepoLink: String!
    DeployedLink: String!
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    readmes(username: String): [ReadMe]
    readme(_id: ID!): ReadMe
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addReadMe(title: String!, description: String!, TableOfContents: String, Installation: String, Usage: String, Credits: String, License: String, Tests: String, RepoLink: String!, DeployedLink: String!): ReadMe
    editReadMe(_id: ID!, title: String!, description: String!, TableOfContents: String, Installation: String, Usage: String, Credits: String, License: String, Tests: String, RepoLink: String!, DeployedLink: String!): ReadMe
    deleteReadMe(_id: ID!): ReadMe
}
`

module.exports = typedefs;