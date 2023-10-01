const assert = require("assert");

// ----- The assert module provides a way of testing expressions ------ //
// If the expression evaluates to 0, or false, an assertion failure is being caused, and the program is terminated.

const ganache = require("ganache");
const { Web3 } = require("web3");
const { inboxContract } = require("../compile");
//
const { abi, evm } = inboxContract;

// ------- Testing contracts with mocha -------- //
// Mocha starts -> deploy the contract -> Manipulate the contact -> Make an assertion about the contract -> Again start from deploy the contract
// 1 -> 2(beforeEach) -> 3(it) -> 4(it) -> 2(beforeEach) -> 3(it) -> 4(it) ->2(beforeEach) and so on ....
const provider = ganache.provider();
const web3 = new Web3(provider);

let accounts;
let inbox;

beforeEach(async () => {
  // Ganache has an array of unlocked accounts for testing
  // we can choose one from the array to deploy the contract

  accounts = await web3.eth.getAccounts();

  // Deploying bytecode on the contract

  inbox = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ["Starter message!"] })
    .send({ from: accounts[0], gas: 1000000 });
});

describe("Inbox contract flow testing", () => {
  it("deploys the contract", () => {
    // console.log(inbox);
    assert.ok(inbox.options.address);

    // If inbox has address then its likely that the contract has been deployed
  });

  // ------ Refer methodsInfo.txt for blockchain methods ------ //

  it("has a default/initial value", async () => {
    const value = await inbox.methods.message().call();
    assert.equal(value, "Starter message!");
  });

  it("can update the message", async () => {
    await inbox.methods
      .setMessage("Modified!")
      .send({ from: accounts[0], gas: 1000000 });
    const newValue = await inbox.methods.message().call();
    console.log(newValue);
    assert.equal(newValue, "Modified!");
  });

  it("can call initial value", async () => {
    const value = await inbox.methods.message().call();
    console.log(value);
    assert.ok(value);
  });
});
