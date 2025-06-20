const express = require('express');
const router = express.Router();

router.use('/restakers', require('./restakers'));
router.use('/validators', require('./validators'));
router.use('/rewards', require('./rewards'));

module.exports = router;
