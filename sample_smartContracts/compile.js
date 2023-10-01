const path = require("path");
const fs = require("fs");
const solc = require("solc");

// Contract path
const inboxPath = path.resolve(__dirname, "contracts", "inbox.sol");
const lotteryPath = path.resolve(__dirname, "contracts", "lottery.sol");
const campaignPath = path.resolve(__dirname, "contracts", "campaign.sol");
// Contract Source
const inboxSource = fs.readFileSync(inboxPath, "utf-8");
const lotterySource = fs.readFileSync(lotteryPath, "utf-8");
const campaignSource = fs.readFileSync(campaignPath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "inbox.sol": {
      content: inboxSource,
    },
    "lottery.sol": {
      content: lotterySource,
    },
    "campaign.sol": {
      content: campaignSource,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

module.exports.inboxContract = JSON.parse(
  solc.compile(JSON.stringify(input))
).contracts["inbox.sol"].Inbox;

module.exports.lotteryContract = JSON.parse(
  solc.compile(JSON.stringify(input))
).contracts["lottery.sol"].Lottery;

module.exports.campaignContract = JSON.parse(
  solc.compile(JSON.stringify(input))
).contracts["campaign.sol"].Campaign;

module.exports.campaignContractFactory = JSON.parse(
  solc.compile(JSON.stringify(input))
).contracts["campaign.sol"].CampaignFactory;
