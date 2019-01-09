'use strict'
// Dependencies
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const root = 'http://ec2-13-233-92-229.ap-south-1.compute.amazonaws.com/api/v1/users/photo/';

// Schema Declaration
let userSchema = new Schema({
  userId: {
    type: String,
    index: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String
  },
  email: {
    type: String,
    required: true,
    trim: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  countryCode: {
    type: Number,
    default: null
  },
  mobileNumber: {
    type: Number,
    default: null
  },
  userType : {
    type: String,
    default: 'normal'
  },
  picture: {
    type: String,
    get: v => `${root}${v}`
  },
  resetPasswordToken: {
    type: String,
    default: null,
    select: false
  },
  resetPasswordExpires: {
    type: Date,
    default: null,
    select: false
  }
}, {
    timestamps: {
      createdAt: 'createdOn',
      updatedAt: 'lastModified'
    }
  })
// end userSchema


mongoose.model('User', userSchema);