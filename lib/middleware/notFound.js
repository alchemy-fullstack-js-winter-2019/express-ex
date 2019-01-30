/* eslint-disable no-console */
module.exports = (req, res) => {
  res.statusCode(404).send({ error: 'Not Found' });
};
