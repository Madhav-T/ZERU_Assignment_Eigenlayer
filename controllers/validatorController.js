const Validator = require('../models/validator');

exports.getValidators = async (req, res) => {
  try {
    const validators = await Validator.find({});
    res.json(validators);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
