const express = require('express');
const router = express.Router();
const { getRewardsByAddress } = require('../controllers/rewardController');

router.get('/:address', getRewardsByAddress);

module.exports = router;
