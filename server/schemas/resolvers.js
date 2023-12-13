const { User, ReadMe, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {

        // User's profile page
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('readme');
            }
            throw AuthenticationError;
        },

        // Returns all users. Only for dev
        users: async () => {
            return User.find().populate('readme');
        },

        // Another user's profile page
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('readme');
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
            const readme = await ReadMe.create({ ...args, author: context.user.username });

            await User.findOneAndUpdate(
                { username: context.user.username },
                { $addToSet: { ReadMes: readme }}
            );
            return readme;
        },

        // Edits a readme and updates a user's readmes
        updateReadMe: async (parent, args, context) => {

            const {
                _id: readMeId,
                ...updateArgs
            } = args;
            
            try {
                const readme = await ReadMe.findOneAndUpdate(
                    { _id: readMeId },
                    { ...updateArgs },
                    { new: true }
                );
    
                await User.findOneAndUpdate(
                    { username: context.user.username },
                    { $pull: { ReadMes: { _id: readMeId } } },
                    { $addToSet: { ReadMes: readme } }
                );

                return readme;

            } catch (error) {
                console.error('Error updating ReadMe:', error);
                throw error;
            }
        },

        // Deletes a readme and removes it from a user's readmes
        deleteReadMe: async (parent, args ) => {
            const readme = await ReadMe.findOneAndDelete({ _id: args._id });
            await User.findOneAndUpdate(
                { _id: args._id },
                { $pull: { ReadMes: { _id: args._id } } },
                { new: true }
            );
            return readme;
        },

        // Create a comment
        addComment: async (parent, { text, readMeId }, context) => {
            const comment = await Comment.create({
                author: context.user.username, 
                text, 
                readMeId
            });
            return comment;
        },

        // Updates a comment
        updateComment: async (parent, { text, readMeId }) => {
            const comment = await Comment.findOneAndUpdate(
                { _id: commentId },
                { text },
                { new: true }
            );

            return comment;
        },

        // Deletes a comment
        deleteComment: async (parent, args ) => {
            const comment = await Comment.findOneAndDelete({ _id: args._id });
            return comment;
        },
    }
};

module.exports = resolvers;