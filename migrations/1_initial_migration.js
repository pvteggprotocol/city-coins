// const CityCoin = artifacts.require("CityCoin");

// module.exports = async (deployer) => {
//   await deployer.deploy(
//     CityCoin, "Dubai City Coin", "DUBAI-UAE"
//   );
//   const cityCoinInstance = await CityCoin.deployed()
//   console.log("CityCoin Deployed at: ", cityCoinInstance.address)
// };


const CityCoinFactory = artifacts.require("CityCoinFactory");

module.exports = async (deployer) => {
  await deployer.deploy(
    CityCoinFactory
  );
  const cityCoinFactoryInstance = await CityCoinFactory.deployed()
  console.log("CityCoinFactory Deployed at: ", cityCoinFactoryInstance.address)
};

