const mongoose = require('mongoose');

const restakerSchema = new mongoose.Schema({
  userAddress: String,
  amountRestakedStETH: String,
  targetAVSOperatorAddress: String,
  lastUpdated: Date
});

module.exports = mongoose.model('Restaker', restakerSchema);
