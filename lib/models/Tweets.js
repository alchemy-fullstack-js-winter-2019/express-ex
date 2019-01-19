let stored = {};

const getTweets = () => stored;

const postTweet = tweet => {
  stored[tweet._id] = tweet;
};

const delTweet = _id => {
  delete stored[_id];
};

module.exports = {
  getTweets,
  postTweet,
  delTweet
};
