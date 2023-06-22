const Twitter = require('twitter');
const config = require('../config');

const client = new Twitter({
  consumer_key: config.twitterApiCredentials.consumer_key,
  consumer_secret: config.twitterApiCredentials.consumer_secret,
  access_token_key: config.twitterApiCredentials.access_token_key,
  access_token_secret: config.twitterApiCredentials.access_token_secret
});

const verifyUserActions = async (userId, requiredActions) => {
  try {
    const userTweets = await client.get('statuses/user_timeline', { user_id: userId, count: 200 });
    const userMentions = await client.get('statuses/mentions_timeline', { user_id: userId, count: 200 });

    const combinedTweets = userTweets.concat(userMentions);

    for (const action of requiredActions) {
      let actionCompleted = false;

      for (const tweet of combinedTweets) {
        if (action.type === 'retweet' && tweet.retweeted_status && tweet.retweeted_status.id_str === action.targetId) {
          actionCompleted = true;
          break;
        } else if (action.type === 'like' && tweet.favorited && tweet.id_str === action.targetId) {
          actionCompleted = true;
          break;
        } else if (action.type === 'hashtag' && tweet.entities.hashtags.some(hashtag => hashtag.text === action.targetHashtag)) {
          actionCompleted = true;
          break;
        }
      }

      if (!actionCompleted) {
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error('Error verifying user actions:', error);
    return false;
  }
};

module.exports = {
  verifyUserActions
};