const Store = require('./index');
//are we exporting new Stor to this route?
//one of the labs is to specify tags make two files, one like this one w/a capital T and another one similar to Tweets
module.exports = new Store('./data/tweets');
