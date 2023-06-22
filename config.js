const twitterApiCredentials = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};

const nftDropSettings = {
  requiredRetweets: process.env.REQUIRED_RETWEETS,
  requiredLikes: process.env.REQUIRED_LIKES,
  requiredHashtags: process.env.REQUIRED_HASHTAGS.split(','),
};

module.exports = {
  twitterApiCredentials,
  nftDropSettings,
};