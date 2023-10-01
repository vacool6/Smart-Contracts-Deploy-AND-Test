const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { campaignContract, campaignContractFactory } = require("../compile");
// const { abi, evm } = campaignContract;
// const { abi, evm } = campaignContractFactory;

const provider = ganache.provider();
const web3 = new Web3(provider);

// console.log(campaignContract);
// console.log(campaignContractFactory);
