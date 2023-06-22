const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  dropDate: {
    type: Date,
    required: true,
  },
  requiredActions: {
    retweet: {
      type: Boolean,
      default: false,
    },
    like: {
      type: Boolean,
      default: false,
    },
    hashtag: {
      type: String,
      default: "",
    },
  },
});

const NFT = mongoose.model("NFT", nftSchema);

module.exports = NFT;