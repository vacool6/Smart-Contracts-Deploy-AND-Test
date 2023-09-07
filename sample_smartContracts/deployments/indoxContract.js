// After successful test of smart contract on ganache test network,
// we can deploy our contract on Sepolia test network

const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { abi, evm } = require("./compile");
require("dotenv").config();

const provider = new HDWalletProvider(
  `${process.env.PNEUMONIC}`,
  `${process.env.NETWORK_ENDPOINT}`
);

const web3 = new Web3(provider);

// Deploying

const deploy = async () => {
  try {
    console.log("👏 Deployment process started 👏");
    const accounts = await web3.eth.getAccounts();
    const deployed = await new web3.eth.Contract(abi)
      .deploy({ data: evm.bytecode.object, arguments: ["Starter message!"] })
      .send({ from: accounts[0], gas: 1000000 });
    console.log("👻 Contract deployed to :", deployed.options.address);
    console.log(
      "--------^ You can interact with this contract from Remix ^-----------"
    );

    provider.engine.stop();
    // ^ This prevents the hanging deployment ^ //
  } catch (err) {
    console.log("👹 ERROR :", err);
  }
};

deploy();

// Older deployments:
// 0xF3cf9Af799B1451F1334322C9c7a83aF146A54d5 (Sepolia)
// 0x1942FA7f9eEFD00B4aF7769Fb070e986e5f76a66 (Sepolia)
