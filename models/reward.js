const mongoose = require('mongoose');

const rewardSchema = new mongoose.Schema({
  walletAddress: String,
  totalRewardsReceivedStETH: String,
  rewardsBreakdown: [
    {
      operatorAddress: String,
      amountStETH: String,
      timestamps: [Number]
    }
  ],
  lastUpdated: Date
});

module.exports = mongoose.model('Reward', rewardSchema);
