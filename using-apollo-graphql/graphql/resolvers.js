const User = require("../models/user");
const resolvers = {
  Query: {
    users: async () => await User.find({}),
    user: async (root, { id }) => {
      return await User.findOne({ _id: id });
    }
  },

  Mutation: {
    addUser: async (root, args) => {
      const user = await new User(args);
      return new Promise((resolve, reject) => {
        user.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    updateUser: async (root, { id, ...data }) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndUpdate(id, { $set: data }, { new: true }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteUser: (root, { id }) => {
      return new Promise((resolve, reject) => {
        User.findByIdAndRemove(id).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    }
  }
};

module.exports = resolvers;
