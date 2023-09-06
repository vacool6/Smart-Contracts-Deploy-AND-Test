const HDWalletProvider = require("@truffle/hdwallet-provider");
const { Web3 } = require("web3");
const { sampleContract } = require("../compile");
const { abi, evm } = sampleContract;
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
      .deploy({ data: evm.bytecode.object, arguments: [] })
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
