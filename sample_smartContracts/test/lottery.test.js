const assert = require("assert");
const ganache = require("ganache");
const { Web3 } = require("web3");
const { lotteryContract } = require("../compile");
const { abi, evm } = lotteryContract;

const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let lottery;
let managerAddress;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  managerAddress = accounts[0];

  lottery = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: managerAddress, gas: 1000000 });
});

describe("Test lottery contract flow", () => {
  it("deploys lottery contract", () => {
    assert.ok(lottery.options.address);
  });

  it("players can enter lottery", async () => {
    await lottery.methods.enterLottery().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lottery.methods.enterLottery().send({
      from: accounts[1],
      value: web3.utils.toWei("0.04", "ether"),
    });

    await lottery.methods.enterLottery().send({
      from: accounts[2],
      value: web3.utils.toWei("0.03", "ether"),
    });

    const players = await lottery.methods
      .playersList()
      .call({ from: accounts[1] });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);
    assert.equal(3, players.length);
  });

  it("enter minimum amount > 0.01 to enter lottery", async () => {
    try {
      await lottery.methods.enterLottery().send({
        from: accounts[2],
        value: web3.utils.toWei("0.01", "ether"),
      });
    } catch (err) {
      console.log("TransactionRevertedWithoutReasonError: Low value");
      assert(err);
    }
  });
});
