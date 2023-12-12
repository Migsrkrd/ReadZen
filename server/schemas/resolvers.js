const { User, ReadMe } = require('../models');
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
        updateReadMe: async (parent, args) => {
            const { readMeId, ...updateArgs } = args;
            const readme = await ReadMe.findOneAndUpdate(
                { _id: readMeId },
                { ...updateArgs },
                { new: true }
            );

            await User.findOneAndUpdate(
                { _id: readMeId },
                { $pull: { ReadMes: { _id: readMeId } } },
                { $addToSet: { ReadMes: readme } }
            );
            return readme;
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
        }
    }
};

module.exports = resolvers;