// querying on ftm testnet

const CityCoin = artifacts.require("CityCoin");
const CityCoinFactory = artifacts.require("CityCoinFactory");

const toWei = (x) => web3.utils.toWei(x, "ether");
const fromWei = (x) => web3.utils.fromWei(x, "ether");

const cityCoinAddress = "0x05D9A7eB0bF18ADEf965848aaf3b214457513b1F";

module.exports = async (done) => {

    try {

    const cityCoin = await CityCoin.at(cityCoinAddress);

    console.log(`owner: ${await cityCoin.owner()}\n`);
    console.log(`name: ${await cityCoin.name()}\n`);
    console.log(`symbol: ${await cityCoin.symbol()}\n`);

    } catch (e) {

    console.log(`exception: ${e.message}\n`);

    }

    done();
}