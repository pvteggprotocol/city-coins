// minting on ftm testnet

const CityCoin = artifacts.require("CityCoin");

const toWei = (x) => web3.utils.toWei(x, "ether");
const fromWei = (x) => web3.utils.fromWei(x, "ether");

const cityCoinAddress = "0x05D9A7eB0bF18ADEf965848aaf3b214457513b1F";
const PrivKey = process.env.SIGNER_PRIVATE

module.exports = async (done) => {

    try {

    const [owner] = await web3.eth.getAccounts();
    const cityCoin = await CityCoin.at(cityCoinAddress);

    console.log(`owner: ${await cityCoin.owner()}\n`);
    console.log(`name: ${await cityCoin.name()}\n`);
    console.log(`symbol: ${await cityCoin.symbol()}\n`);
    console.log(`total supply before: ${fromWei(await cityCoin.totalSupply())}\n`);

    const nonce = parseInt(await cityCoin.getNonce.call(owner));
    const encoded = web3.eth.abi.encodeParameters(
        ["address", "uint256", "uint256", "address"],
        [owner, toWei("10"), nonce, cityCoin.address]
    );
    const hash = web3.utils.keccak256(encoded);
    const signedHash = await web3.eth.accounts.sign(hash, PrivKey);
    await cityCoin.safeMintWithSignature(
        owner, toWei("10"), signedHash["v"], signedHash["r"], signedHash["s"]
    );

    console.log(`total supply after: ${fromWei(await cityCoin.totalSupply())}\n`);


    } catch (e) {

    console.log(`exception: ${e.message}\n`);

    }

    done();
}