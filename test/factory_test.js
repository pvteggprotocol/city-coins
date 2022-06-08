const { ether, expectEvent, expectRevert } = require("@openzeppelin/test-helpers");
const { expect } = require("chai");

const CityCoin = artifacts.require("CityCoin")
const CityCoinFactory = artifacts.require("CityCoinFactory");

const toWei = (x) => web3.utils.toWei(x, "ether")
const fromWei = (x) => web3.utils.fromWei(x, "ether")

contract("CityCoinFactoryContract", async (accounts) => {
    
    const [owner, user, other] = accounts
    const PrivKey = "94ba13eba81dfd2ddfe39007968e82fb3204090cfbf870efc80f55c8351b4eb5"
    const PubKey = "0x4547c37d4deffe39c2ea965ae9d28091c93c1e8f"

    describe("factory: when contract is deployed", async () => {
        before(async () => {
            this.cityCoinFactory = await CityCoinFactory.new()
            this.cityCoinAddress = await this.cityCoinFactory.generateCityCoinContract.call("CityCoin", "MyCity")
            await this.cityCoinFactory.generateCityCoinContract("CityCoin", "MyCity")
            this.cityCoin = await CityCoin.at(this.cityCoinAddress);
            // this.cityCoin = await CityCoin.new("CityCoin", "MyCity")
            
        })

        it("should transfer ownership and whitelist the owner", async () => {
            const receipt = await this.cityCoinFactory.transferCityCoinOwnership("MyCity", owner)
            expectEvent(
                receipt,
                "OwnershipTransferred",
                {
                    previousOwner: this.cityCoinFactory.address,
                    newOwner: owner
                }
            )
        })

        it("factory: should deploy token with correct params", async () => {
            expect(await this.cityCoin.owner()).to.be.equal(owner);
            expect(await this.cityCoin.totalSupply()).to.be.bignumber.equal("0");
        })

        it("factory: should mint tokens to owner only with correct v,r,s params", async () => {
            await this.cityCoin.setSigner(PubKey) // set the correct signer
            
            // _buildHash(address to, uint256 amount, uint256 _nonce) 
            const nonce = parseInt(await this.cityCoin.getNonce.call(owner))

            const encoded = web3.eth.abi.encodeParameters(
                ["address", "uint256", "uint256", "address"],
                [owner, 10, nonce, this.cityCoin.address]
            )
            const hash = web3.utils.keccak256(encoded)
            const signedHash = await web3.eth.accounts.sign(hash, PrivKey)

            await this.cityCoin.safeMintWithSignature(
                owner, 10, signedHash["v"], signedHash["r"], signedHash["s"]
            )

            expect(await this.cityCoin.balanceOf(owner)).to.be.bignumber.equal("10");

        })

        it("factory: should mint tokens because owner is minter", async () => {
            await this.cityCoin.mint(owner, 1000)
            await this.cityCoin.mint(user, 1000)
            
            await this.cityCoin.transfer(other, 100, { from : user })
            await this.cityCoin.blacklist(other);
            await this.cityCoin.transfer(other, 100, { from : owner })
            await this.cityCoin.unBlacklist(other);
            await this.cityCoin.transfer(other, 100, { from : owner })

            expect(await this.cityCoin.balanceOf(other)).to.be.bignumber.equal("250")
            expect(await this.cityCoin.balanceOf(this.cityCoin.address)).to.be.bignumber.equal("50")
        })


    })

})