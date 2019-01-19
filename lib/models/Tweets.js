let stored = {};

const getTweets = () => stored;

const getTweet = _id => stored[_id];

const postTweet = tweet => {
  stored[tweet._id] = tweet;
};

const delTweet = _id => {
  delete stored[_id];
};

const updateTweet = (_id, tweet) => {
  tweet._id = _id;
  tweet.handle = stored[_id].handle;
  stored[_id] = tweet;
  return getTweet(_id);
};

console.log('tweets stored', stored);

module.exports = {
  getTweets,
  getTweet,
  postTweet,
  delTweet,
  updateTweet
};
