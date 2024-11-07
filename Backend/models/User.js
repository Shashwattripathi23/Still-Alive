const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    required: true,
    default: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
});

const followUpSchema = new mongoose.Schema({
  check1: {
    type: Boolean,
    required: true,
    default: false,
  },
  check2: {
    type: Boolean,
    required: true,
    default: false,
  },
  lastFollowUp: {
    type: Boolean,
    required: true,
    default: false,
  },
  contacts: {
    type: contactSchema,
    required: true,
  },
  followUpResponse: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const linkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const looseEndSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  phoneCode: {
    type: String,
    required: true
  },
  relation: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  affection: {
    type: Number,
    required: true,
  },
  links: {
    type: [linkSchema],
    required: true,
  },
  message: {
    type: String,
  },
});

const instaLinkSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
});

const instagramSchema = new mongoose.Schema({
  photos: {
    type: [instaLinkSchema],
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  phoneCode: {
    type: String,
    required: false,
  },
  dateOfBirth: {
    type: Date,
    required: false,
  },
  gender: {
    type: String,
    required: false,
  },
  profilePicture: {
    type: String,
    required: false,
  },
  timer: {
    type: String,
    required: false,
  },
  lastActive: {
    type: Date,
    required: false,
  },
  followUp: {
    type: followUpSchema,
    required: false,
  },
  looseEnd: {
    type: [looseEndSchema],
    required: false,
  },
  isAlive: {
    type: Boolean,
    required: false,
    default: true,
  },
  instagram: {
    type: instagramSchema,
    required: false,
  },
  lastAffair: {
    type: Boolean,
    required: false,
    default: false,
  },
  lastNotify: {
    type: Date,
    required: false,
  },
});

module.exports = mongoose.model("User", userSchema);
