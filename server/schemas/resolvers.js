const { User, ReadMe, Comment } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

// Helper function to update author name in all readmes
const updateAuthorNamenReadMes = async (oldUsername, newUsername) => {
    try {
        // find all readmes by user
        const userReadMes = await ReadMe.find({ author: oldUsername });

        // update author name in each readme
        await Promise.all(
            userReadMes.map(async (readme) => {
                readme.author = newUsername;
                return readme.save();
            })
        );
    } catch (error) {
        console.error('Error updating author name in readmes:', error);
        throw error;
    }
};

const resolvers = {
    Query: {

        // User's profile page
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
        },

        // Returns all users. Only for dev
        users: async () => {
            return await User.find().populate('readMes');
        },

        // Another user's profile page
        user: async (parent, { userId }) => {
            return await User.findOne({ _id: userId }).populate('readMes');
        },

        // Returns all readmes
        allreadmes: async (parent, args) => {
            return await ReadMe.find({});
        },

        // Returns all readmes with isPublished: true
        publishedReadmes: async () => {
            return await ReadMe.find({ isPublished: true });
        },
        //returns searched for readmes
        searchReadmes: async (parent, args) => {
            const regex = new RegExp(args.query, 'i');
            const readme = await ReadMe.find({    
                $or: [
                { author: { $regex: regex } },
                { title: { $regex: regex } },
                { description: { $regex: regex} }
            ],
            isPublished: true
            })
            return readme
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
        comments: async (_, { readMeId }) => {
            try {
              // Ensure readMeId is defined
              if (!readMeId) {
                throw new Error("readMeId is required.");
              }
      
              // Use Mongoose to find comments based on readMeId
              const comments = await Comment.find({ readMeId });
      
              return comments;
            } catch (error) {
              console.error("Error in comments resolver:", error.message);
              throw new Error("Internal server error. Please try again later.");
            }
          },
    },
    
    Mutation: {

        // Logs in a user and assigns a token
        login: async (parent, { email, password }, context) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw AuthenticationError;
            }

            const correctPass = await user.isCorrectPassword(password);
            if (!correctPass) {
                throw AuthenticationError;
            }

            if (!user.likes) {
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { likes: [] },
                    { new: true }
                );
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

        // Update a user with a new username
        updateUsername: async (parent, { id, newUsername }, context) => {
            if (context.user && context.user._id == id) {
                try {
                    // find and update the user
                    const updatedUser = await User.findByIdAndUpdate(
                      id,
                      { $set: { username: newUsername } },
                      { new: true }
                    );
              
                    if (!updatedUser) {
                      throw new AuthenticationError('User not found');
                    }
    
                    // update author name in readmes
                    await updateAuthorNamenReadMes(context.user.username, newUsername);
    
                    const token = signToken(updatedUser);
                    return { token, updatedUser };
                } catch (error) {
                    console.error('Error updating username:', error);
                    throw error;
                }
            }
            throw AuthenticationError;
        },
      
        // Update a user with a new password
        updatePassword: async (parent, { id, currentPassword, newPassword }, context) => {
            if (context.user && context.user._id == id) {

                // find the user
                const user = await User.findById(id);
          
                if (!user) {
                  throw new AuthenticationError('User not found');
                }
    
                // check the password
                const correctPass = await user.isCorrectPassword(currentPassword);
          
                if (!correctPass) {
                  throw new AuthenticationError('Incorrect password');
                }
    
                // update the password
                user.password = newPassword;
                await user.save();
          
                const token = signToken(user);
                return { token, user };
            }
            throw AuthenticationError;
        },

        deleteUser: async (parent, { id, password }, context) => {
            if (context.user && context.user._id == id) {
                
                // find the user
                const user = await User.findById(id);

                if (!user) {
                  throw new AuthenticationError('User not found');
                }
    
                // check the password
                const correctPass = await user.isCorrectPassword(password);
                
                if (!correctPass) {
                    throw new AuthenticationError('Incorrect password');
                }
            
                // find readmes authored by the user
                const userReadmes = await ReadMe.find({ author: user.username });
    
                // extract the IDs of user's readmes
                const userReadmeIds = userReadmes.map(readme => readme._id);
    
                // delete comments made by others on the user's readmes
                await Comment.deleteMany({
                    readMeId: {
                        $in: userReadmeIds
                    },
                    author: {
                        $ne: user.username
                    }
                });
    
                // delete associated ReadMes and comments
                await ReadMe.deleteMany({ author: user.username });
                await Comment.deleteMany({ author: user.username });
            
                // delete the user
                const deletedUser = await User.findByIdAndRemove(id);
    
                if (!deletedUser) {
                    throw new AuthenticationError('User not found');
                }
                return deletedUser;
            }
            throw AuthenticationError;
        },

        // Stores a liked readme to a user, and increments the readme's likeCount
        likeReadMe: async (parent, args, context) => {

            if (context.user) {
                const readme = await ReadMe.findOneAndUpdate(
                    { _id: args.readMeId },
                    { $inc: { likeCount: 1 } },
                    { new: true }
                  ).exec()

                const user = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { likes: readme }},
                    { new: true }
                );
                return user;
            }
            throw AuthenticationError;
        },

        unLikeReadMe: async (parent, args, context) => {
            if (context.user) {

                    const readme = await ReadMe.findOneAndUpdate(
                        { _id: args.readMeId },
                        { $inc: { likeCount: -1 } },
                        { new: true }
                    ).exec();

                    const user = await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { likes: args.readMeId }},
                        { new: true }
                    );
                
                    return user;
            }
            throw AuthenticationError;
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
                const readmeAuthor = (await ReadMe.findOne({ _id: args._id })).author;

                // Checks if the logged in user matches the readme author
                if (readmeAuthor == context.user.username) {
                    const readme = await ReadMe.findOneAndUpdate(
                        { _id: args._id },
                        { ...args },
                        { new: true }
                    );
    
                    await User.findOneAndUpdate(
                        { _id: context.user._id },
                        { $pull: { readMes: { _id: args._id } } },
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