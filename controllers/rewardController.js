const Reward = require('../models/reward');

exports.getRewardsByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    const rewards = await Reward.findOne({ walletAddress: address });

    if (!rewards) {
      return res.status(404).json({ msg: 'No rewards found for this address' });
    }

    res.json(rewards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
