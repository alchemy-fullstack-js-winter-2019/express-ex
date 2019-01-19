let stored = {};

const getTweets = () => stored;

const postTweet = tweet => {
  stored[tweet._id] = tweet;
};

module.exports = {
  getTweets,
  postTweet
};
