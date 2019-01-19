let stored = {};

const getTags = () => stored;

const getTag = _id => stored[_id];

const postTag = tag => stored[tag._id] = tag;

const delTag = _id => delete stored[_id];

const updateTag = (_id, tag) => {
  tag._id = _id;
  stored[_id] = tag;
  return getTag(_id);
};

module.exports = {
  getTags,
  getTag,
  postTag,
  delTag,
  updateTag
};
