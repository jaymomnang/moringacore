'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var loginSchema = new Schema({
  userid: {
    type: String
  },
  email: {
    type: String,
    Required: 'Please enter email address'
  },
  username: {
    firstname: [{
      type: String,
      Required: 'Please enter the firstname'
    }],
    middlename:  [{
      type: String
    }],
    lastname: [{
      type: String,
      Required: 'Please enter the lastname'
    }]
  },
  pwd: {
    type: String,
    Required: 'Please enter your password'
  },
  salt: {
    type: String,
    default: 'MoringaCore##'
  },
  CreatedDate: {
    type: Date,
    default: Date.now
  },
  LastloginDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['active', 'inactive', 'suspended']
    }],
    default: ['inactive']
  }
});

module.exports = mongoose.model('login', loginSchema);
