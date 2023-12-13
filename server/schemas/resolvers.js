const { User, ReadMe, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {

        // User's profile page
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('readMes');
            }
            throw AuthenticationError;
        },

        // Returns all users. Only for dev
        users: async () => {
            return User.find().populate('readMes');
        },

        // Another user's profile page
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('readMes');
        },

        // Returns all readmes
        allreadmes: async (parent, args) => {
            return ReadMe.find({});
        },

        // Returns all readmes with isPublished: true
        publishedReadmes: async () => {
            return ReadMe.find({ isPublished: true });
        },

        // Returns all readmes of a given user
        readmes: async (parent, { username }, context) => {
            return ReadMe.find({ author: username });
        },

        // Returns a single readme by id
        readme: async (parent, { readMeId }) => {
            return ReadMe.findOne({ _id: readMeId }).populate('author');
        },

        // Returns all comments
        comments: async () => {
            return Comment.find({});
        }
    },
    
    Mutation: {

        // Logs in a user and assigns a token
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }

            const correctPass = await user.isCorrectPassword(password);
            if (!correctPass) {
                throw AuthenticationError;
            }

            const token = signToken(user);
            return { token, user };
        },

        // Creates a new user and assigns a token
        addUser: async (parent, args) => {
            console.log("add user")
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

        // Creates a new readme and adds it to user's readmes
        addReadMe: async (parent, args, context) => {
            if (context.user) {
                const readme = await ReadMe.create({ ...args, author: context.user.username });

                await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $addToSet: { readMes: readme }}
                );
                return readme;
            }
            throw AuthenticationError;
        },

        // Edits a readme and updates a user's readmes
        updateReadMe: async (parent, args, context) => {
            if (context.user) {
                const { readMeId, ...updateArgs } = args;
                const readmeAuthor = (await ReadMe.findOne({ _id: readMeId })).author;

                // Checks if the logged in user matches the readme author
                if (readmeAuthor == context.user.username) {
                    const readme = await ReadMe.findOneAndUpdate(
                        { _id: readMeId },
                        { ...updateArgs },
                        { new: true }
                    );
    
                    await User.findOneAndUpdate(
                        { _id: readMeId },
                        { $pull: { readMes: { _id: readMeId } } },
                        { $addToSet: { readMes: readme } }
                    );
                    return readme;
                }
            }
            throw AuthenticationError;
        },

        // Deletes a readme and removes it from a user's readmes
        deleteReadMe: async (parent, args, context ) => {
            if (context.user) {
                const readmeAuthor = (await ReadMe.findOne({ _id: args._id })).author;

                // Checks if the logged in user matches the readme author
                if (readmeAuthor == context.user.username) {
                    const readme = await ReadMe.findOneAndDelete({ _id: args._id });
                    await User.findOneAndUpdate(
                        { _id: args._id },
                        { $pull: { readMes: { _id: args._id } } },
                        { new: true }
                    );
                    return readme;
                }
            }
            throw AuthenticationError;
        },

        // Create a comment
        addComment: async (parent, args, context) => {
            if (context.user) {
                const comment = await Comment.create({
                    author: context.user.username, 
                    text: args.text, 
                    readMeId: args.readMeId
                });
                return comment;
            }
            throw AuthenticationError;
        },

        // Updates a comment
        updateComment: async (parent, args, context) => {
            if (context.user) {
                const commentAuthor = (await Comment.findOne({ _id: args._id })).author;

                // Checks if the logged in user matches the comment author
                if (commentAuthor == context.user.username) {
                    const comment = await Comment.findOneAndUpdate(
                        { _id: args._id },
                        { text: args.text },
                        { new: true }
                    );
        
                    return comment;
                }
            }
            throw AuthenticationError;
        },

        // Deletes a comment
        deleteComment: async (parent, args, context) => {
            if(context.user) {
                const commentAuthor = (await Comment.findOne({ _id: args._id })).author;

                // Checks if the logged in user matches the comment author
                if (commentAuthor == context.user.username) {
                    const comment = await Comment.findOneAndDelete({ _id: args._id });
                    return comment;
                }
            }
            throw AuthenticationError;
        },
    }
};

module.exports = resolvers;