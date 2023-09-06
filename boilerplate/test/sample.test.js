const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { sampleContract } = require("../compile");
const { abi, evm } = sampleContract;

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let sample;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  sample = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: [] })
    .send({ from: accounts[0], gas: 1000000 });
});

describe("Inbox contract flow testing", () => {
  it("deploys the contract", () => {
    assert.ok(sample.options.address);
  });
});
