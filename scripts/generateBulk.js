// generating in bulk on ftm testnet

const CityCoin = artifacts.require("CityCoin");
const CityCoinFactory = artifacts.require("CityCoinFactory");

const toWei = (x) => web3.utils.toWei(x, "ether");
const fromWei = (x) => web3.utils.fromWei(x, "ether");

module.exports = async (done) => {

    try {

    const [admin] = await web3.eth.getAccounts();
    console.log(`admin: ${admin}\n`);


    const balance = await web3.eth.getBalance(admin);
    console.log(`eth balance: ${balance}`);

    const cityCoinFactory = await CityCoinFactory.at("0x08d295663Ad7F999Abd7c90AB2d1f5498F6ba910");

    const address = await cityCoinFactory.generateCityCoinContractWithOwner.call("name2", "ticker2", "0x405b3cA1047C933F8d0714009Bfa43B5F1DA6376");
    const x = await cityCoinFactory.generateCityCoinContractWithOwner("name2", "ticker2", "0x405b3cA1047C933F8d0714009Bfa43B5F1DA6376");

    console.log(`${JSON.stringify(x)}\n`);

    console.log(`generated at: ${address}\n`);


    } catch (e) {

    console.log(`exception: ${e.message}\n`);

    }

    done();
}