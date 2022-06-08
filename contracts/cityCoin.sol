//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
contract A{
}

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

// contract CityCoin is ERC20, Ownable {
//     using ECDSA for bytes32;

//     address public signer;

//     mapping(address => bool) private blacklisted;
//     mapping(address => bool) private minter;
//     mapping(address => uint256) private nonce;
//     mapping(bytes32 => bool) private done;

//     uint256 public taxPercentage;

//     constructor(string memory name, string memory ticker) ERC20(name, ticker) Ownable() {
//         taxPercentage = 5_000;
//         minter[owner()] = true;
//     }

//     function transferOwnership(address newOwner) public virtual override(Ownable) onlyOwner  {
//         // @dev only owner can mint tokens
//         minter[owner()] = false;
//         minter[newOwner] = true;

//         super.transferOwnership(newOwner);
//     }

//     // @dev override transfer function
//     function transfer(address to, uint256 _amount) public virtual override(ERC20) returns (bool) {
//         uint256 amount = _amount;
//         if(blacklisted[to]) {
//             //tax!
//             uint256 taxedAmount = (taxPercentage * _amount) / 10_000;
//             amount -= taxedAmount;
//             super.transfer(address(this), taxedAmount);
//         }
        
//         return super.transfer(to, amount);
//     }

//     // @dev verified safe minting from backend
//     function safeMintWithSignature(address to, uint256 amount, uint8 v, bytes32 r, bytes32 s) external virtual {
//         // mint only from frontend when some action is completed
//         // give the signed message to the user and user calls this function to mint the tokens
//         bytes32 hash = _buildHash(to,amount,nonce[to]);
//         require(!done[hash], "mint:txn completed before");
//         done[hash] = true;
//         nonce[to]++;

//         address _signer = ecrecover(hash.toEthSignedMessageHash(),v,r,s);
//         require(signer == _signer, "mint:wrong signer!");
//         _mint(to, amount);
//     }

//     function setSigner(address _signer) external virtual onlyOwner {
//         signer = _signer;
//     }

//     function setTaxPercentage(uint16 prcnt) external virtual onlyOwner {
//         require(prcnt >= 0 && prcnt <= 10_000, "setTaxPercentage:invalid prcnt!");
//         taxPercentage = prcnt;
//     }

//     // --- Minter role start
//     function setMinterRole(address addr, bool role) external virtual onlyOwner {
//         minter[addr] = role;
//     }

//     function getMinterRole(address addr) external virtual returns(bool) {
//         return minter[addr];
//     }
//     // --- Minter role ends

//     function getNonce(address user) external virtual returns(uint256) {
//         return nonce[user];
//     }

//     // --- blacklisted start
//     function isblacklisted(address user) external virtual returns(bool) {
//         return blacklisted[user];
//     }

//     function blacklist(address user) external virtual {
//         blacklisted[user] = true;
//     }

//     function unBlacklist(address user) external virtual {
//         blacklisted[user] = false;
//     }
//     // --- blacklisted ends

//     // @dev can be minted by owner
//     function mint(address to, uint256 amount) external virtual {
//         // only users and contracts with minter role can mint tokens
//         require(minter[msg.sender], "mint:not minter");
//         _mint(to, amount);
//     }

//     function withdrawAnyERC20Token(address token, address to) external virtual onlyOwner {
//         // withdraw any token
//         uint256 balance = ERC20(token).balanceOf(address(this));
//         ERC20(token).transfer(to, balance);
//     }

//     function _buildHash(address to, uint256 amount, uint256 _nonce) internal virtual returns(bytes32) {
//         bytes32 hash = keccak256(abi.encode(
//             to, amount, _nonce, address(this)
//         ));
//         // address(this) prevents usage of this code in other CityCoin token contracts
//         // nonce prevents replay attacks (in case when txn fails and done is not updated yet)
//         return hash;
//     }

//     // @dev burn tokens
//     function burn(uint256 amount) external virtual {
//         _burn(msg.sender, amount);
//     }

// }

// /*
// Features
// --------
// 1. 50% tax on transfer, except whitelisted addresses
// 2. only frontend and OWNER can mint this token
// */