const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Post = require("./models/Posts");
const Comment = require("./models/Comments");
const Questions = require("./models/Questions");

const { get } = require("mongoose");
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
    getPost: async (_, { email }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const posts = await Post.find({
        email,
      });
      return posts;
    },
    getPosts: async () => {
      const posts = await Post.find();
      return posts;
    },
    getComments: async (_, { postId }) => {
      const comments = await Comment.find({ postId });
      return comments;
    },
    getQuestions: async () => {
      const questions = await Questions.find();
      return questions;
    },
    getQuesPost: async (_, { questionId }) => {
      const posts = await Post.find({ questionId });
      return posts;
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
    addPost: async (_, { postInput }) => {
      const email = postInput.email;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const postId = (await Post.find().countDocuments()) + 1;
      postInput.id = postId.toString();
      const newPost = new Post(postInput);
      await newPost.save();
      return newPost;
    },
    addComment: async (_, { commentInput }) => {
      const email = commentInput.email;
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");
      const postId = commentInput.postId;
      const post = await Post.findOne({ id: postId });
      if (!post) throw new Error("Post not found");
      const commentId = (await Comment.find().countDocuments()) + 1;
      commentInput.id = commentId.toString();
      const newComment = new Comment(commentInput);
      await newComment.save();
      return newComment;
    },
    deletePost: async (_, { id }) => {
      const post = await Post.findOne({
        id,
      });
      if (!post) throw new Error("Post not found");
      await post.remove();
      return "Post deleted successfully";
    },

    deleteComment: async (_, { id }) => {
      const comment = await Comment.findOne({
        id,
      });
      if (!comment) throw new Error("Comment not found");
      await comment.remove();
      return "Comment deleted successfully";
    },
    addQuestion: async (_, { content, email }) => {
      const user = await User.findOne({
        email,
      });
      if (!user) throw new Error("User not found");
      const questionId = (await Questions.find().countDocuments()) + 1;
      const newQuestion = new Questions({
        id: questionId.toString(),
        content,
        email,
      });
      await newQuestion.save();
      return newQuestion;
    },
  },
};

module.exports = resolvers;
