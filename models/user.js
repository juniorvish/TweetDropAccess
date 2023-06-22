const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  twitterId: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  actionsCompleted: {
    type: Map,
    of: Boolean,
    default: {}
  },
  nftDropAccess: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;