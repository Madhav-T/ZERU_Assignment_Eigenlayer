require('dotenv').config();
const axios = require('axios');
const connectDB = require('../config');
const Restaker = require('../models/restaker');
const Validator = require('../models/validator');
const Reward = require('../models/reward');

const fetchAndStoreData = async () => {
  console.log('Fetch script started...');
  await connectDB();

  try {
    // === Fetch Validators from Rated API ===
    const validatorRes = await axios.get('https://api.rated.network/v1/eigenlayer/rewards/operator');
    for (const v of validatorRes.data) {
      await Validator.findOneAndUpdate(
        { operatorAddress: v.operator_address },
        {
          operatorAddress: v.operator_address,
          totalDelegatedStakeStETH: v.total_stake.toString(),
          slashHistory: [], // Rated doesn't provide slashing directly
          status: 'active', // Assume active or enhance if API supports
          lastUpdated: new Date()
        },
        { upsert: true }
      );
    }

    // === Fetch Restakers from Rated API ===
    const restakerRes = await axios.get('https://api.rated.network/v1/eigenlayer/rewards/delegator');
    for (const r of restakerRes.data) {
      await Restaker.findOneAndUpdate(
        { userAddress: r.delegator },
        {
          userAddress: r.delegator,
          amountRestakedStETH: r.total_stake.toString(),
          targetAVSOperatorAddress: r.top_operator || '',
          lastUpdated: new Date()
        },
        { upsert: true }
      );
    }

    // === Fetch Rewards for Known Delegators ===
    for (const r of restakerRes.data.slice(0, 5)) { // limit for now
      const rewRes = await axios.get(`https://api.rated.network/v1/eigenlayer/rewards/delegator?address=${r.delegator}`);
      const rew = rewRes.data;

      const breakdown = rew?.rewards_breakdown?.map(b => ({
        operatorAddress: b.operator_address,
        amountStETH: b.amount.toString(),
        timestamps: b.timestamps || []
      })) || [];

      await Reward.findOneAndUpdate(
        { walletAddress: rew.wallet_address },
        {
          walletAddress: rew.wallet_address,
          totalRewardsReceivedStETH: rew.total_rewards.toString(),
          rewardsBreakdown: breakdown,
          lastUpdated: new Date()
        },
        { upsert: true }
      );
    }

    console.log('Rated API data updated.');
    process.exit(0);
  } catch (err) {
    console.error('Error updating from Rated API:', err.message);
    process.exit(1);
  }
};

fetchAndStoreData();
