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
        // Returns all readmes of a given user
        readmes: async (parent, { username }) => {
            const user = User.findOne({ username: username });
            const readmes = user.ReadMes;

            return readmes;
        },
        // Returns a single readme by id
        readme: async (parent, { readmeId }) => {
            return ReadMe.findOne({ _id: readmeId });
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
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        // Creates a new readme and adds it to user's readmes
        addReadMe: async (parent, args) => {
            const readme = await ReadMe.create({ ...args });

            await User.findOneAndUpdate(
                { username: args.username },
                { $addToSet: { ReadMes: readme }}
            );
            return readme;
        },
        // Edits a readme and updates a user's readmes
        updateReadMe: async (parent, args) => {
            const readme = await ReadMe.findOneAndUpdate(
                { _id: readmeId },
                { ...args },
                { new: true}
                );
            await User.findOneAndUpdate(
                { _id: readmeId },
                { $pull: { ReadMes: { _id: readmeId }}},
                { $addToSet: { ReadMes: readme }}
            );
            return readme;
        },
        // Deletes a readme and removes it from a user's readmes
        deleteReadMe: async (parent, { readmeId }) => {
            const readme = await ReadMe.findOneAndDelete({ _id: readmeId });
            await User.findOneAndUpdate(
                { _id: readmeId },
                { $pull: { ReadMes: { _id: readmeId }}},
                { new: true}
            );
            return readme;
        }
    }
};

module.exports = resolvers;