const CityCoin = artifacts.require("CityCoin");

module.exports = async (deployer) => {
  await deployer.deploy(
    CityCoin, "Dubai City Coin", "DUBAI-UAE"
  );
  const cityCoinInstance = await CityCoin.deployed()
  console.log("CityCoin Deployed at: ", cityCoinInstance.address)
};
