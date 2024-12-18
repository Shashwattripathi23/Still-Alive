// schema.js
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date
  type Query {
    hello: String
    password(email: String!): String
    getUserInfo(email: String!): UserInfo
    getPost(email: String!): [Post]
    getPosts: [Post]
    getComments(postId: String!): [Comment]
    getQuestions: [questionSchema]
    getQuesPost(questionId: String!): [Post]
  }

  type Mutation {
    login(email: String!, password: String!): AuthPayload
    register(
      email: String!
      password: String!
      confirmPass: String!
      firstName: String!
      lastName: String!
    ): String
    editUserInfo(UserInfo: UserInfoInput!): UserInfo
    addPost(postInput: PostInput): Post
    addComment(commentInput: CommentInput): Comment
    deletePost(id: ID!): String
    deleteComment(id: ID!): String
    addQuestion(content: String!, email: String!): questionSchema
  }

  type AuthPayload {
    token: String
  }
  type UserInfo {
    firstName: String
    lastName: String
    email: String
    phone: String
    phoneCode: String
    dateOfBirth: Date
    gender: String
    profilePicture: String
    timer: String
    lastActive: String
    followUp: followUpSchema
    looseEnds: [looseEndSchema]
    isAllive: Boolean
    instagram: instaSchema
    lastAffair: Boolean
    lastNote: String
  }
  input UserInfoInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    phoneCode: String
    dateOfBirth: Date
    gender: String
    profilePicture: String
    timer: String
    lastActive: String
    followUp: followUpSchemaInput
    looseEnds: [looseEndSchemaInput]
    isAllive: Boolean
    instagram: instaSchemaInput
    lastAffair: Boolean
    lastNote: String
  }

  type followUpSchema {
    check1: Boolean
    check2: Boolean
    lastFollowUp: Boolean
    contacts: contachSchema
    followUpResponse: Boolean
  }
  input followUpSchemaInput {
    check1: Boolean
    check2: Boolean
    lastFollowUp: Boolean
    contacts: contachSchemaInput
    followUpResponse: Boolean
  }

  type contachSchema {
    active: Boolean
    firstName: String
    lastName: String
    email: String
    phone: String
    phoneCode: String
    relation: String
  }
  input contachSchemaInput {
    active: Boolean
    firstName: String
    lastName: String
    email: String
    phone: String
    phoneCode: String
    relation: String
  }
  type linkSchema {
    link: String
    description: String
  }
  input linkSchemaInput {
    link: String
    description: String
  }
  type looseEndSchema {
    firstName: String
    lastName: String
    email: String
    phone: String
    phoneCode: String
    relation: String
    gender: String
    affection: String
    links: [linkSchema]
    message: String
  }
  input looseEndSchemaInput {
    firstName: String
    lastName: String
    email: String
    phone: String
    phoneCode: String
    relation: String
    gender: String
    affection: String
    links: [linkSchemaInput]
    message: String
  }
  type instaLinkSchema {
    link: String
  }
  input instaLinkSchemaInput {
    link: String
  }
  type instaSchema {
    photos: [instaLinkSchema]
    caption: String
  }
  input instaSchemaInput {
    photos: [instaLinkSchemaInput]
    caption: String
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    email: String!
    date: Date!
    questionId: String
  }

  input PostInput {
    title: String!
    body: String!
    email: String!
    questionId: String
  }
  type Comment {
    id: ID!
    postId: ID!
    body: String!
    email: String!
    date: Date!
  }
  input CommentInput {
    postId: ID!
    body: String!
    email: String!
  }
  type questionSchema {
    id: String!
    content: String!
    date: Date!
    email: String!
  }
`;

module.exports = typeDefs;
