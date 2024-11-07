// resolvers.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User"); // Ensure you have a User model

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    password: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      return user.password;
    },
    getUserInfo: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      return user;
    },
  },

  Mutation: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return { token };
    },

    register: async (
      _,
      { email, password, confirmPass, firstName, lastName }
    ) => {
      const passCheck = password.localeCompare(confirmPass);
      if (passCheck !== 0) throw new Error("Passwords do not match");
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashedPassword,
        firstName,
        lastName,
      });
      await newUser.save();
      return "User registered successfully";
    },

    editUserInfo: async (_, { UserInfo }) => {
      const user = await User.findOne({ email: UserInfo.email });
      if (!user) throw new Error("User not found");
      Object.keys(UserInfo).forEach((key) => {
        if (key !== "email") user[key] = UserInfo[key];
      });

      await user.save();
      return user;
    },
  },
};

module.exports = resolvers;
