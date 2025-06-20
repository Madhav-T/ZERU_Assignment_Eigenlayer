const Web3 = require('web3');
require('dotenv').config();

const web3 = new Web3(process.env.RPC_URL); // e.g., Infura or Alchemy endpoint

module.exports = web3;
