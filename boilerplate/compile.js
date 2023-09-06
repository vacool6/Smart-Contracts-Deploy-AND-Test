const path = require("path");
const fs = require("fs");
const solc = require("solc");

const samplePath = path.resolve(__dirname, "contracts", "sample.sol");
const sampleSource = fs.readFileSync(samplePath, "utf-8");

const input = {
  language: "Solidity",
  sources: {
    "sample.sol": {
      content: sampleSource,
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

module.exports.sampleContract = JSON.parse(
  solc.compile(JSON.stringify(input))
).contracts["sample.sol"].Sample;
