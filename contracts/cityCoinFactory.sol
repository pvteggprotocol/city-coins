// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract B{
}
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "./flattened_citycoin.sol";
// import "./cityCoin.sol";

// contract CityCoinFactory is Ownable {

//     mapping(string => CityCoin) cityCoinTickerMapping;
//     mapping(string => bool) exists;

//     constructor() Ownable() {
//     }

//     // @dev can make a city coin with unique ticker only
//     function generateCityCoinContract(string memory name, string memory ticker) public onlyOwner returns(address) {
//         require(!exists[ticker], 'generateCityCoinContract: ticker exists');
//         exists[ticker] = true;
//         CityCoin citycoin = new CityCoin(name, ticker);
//         cityCoinTickerMapping[ticker] = citycoin;
//         return address(citycoin);
//     }

    // // @dev generate citycoin and transferownership
    // function generateCityCoinContractWithOwner(string memory name, string memory ticker, address newOwner) public onlyOwner returns(address) {
    //     require(!exists[ticker], 'generateCityCoinContract: ticker exists');
    //     exists[ticker] = true;
    //     CityCoin citycoin = new CityCoin(name, ticker);
    //     cityCoinTickerMapping[ticker] = citycoin;
    //     transferCityCoinOwnership(ticker, newOwner);
    //     return address(citycoin);
    // }


//     function getCityCoinAddress(string memory ticker) public view returns(address) {
//         return address(cityCoinTickerMapping[ticker]);
//     }

//     function transferCityCoinOwnership(string memory ticker, address newOwner) public onlyOwner {
//         require(exists[ticker], 'transferCityCoinOwnership: no such cityCoin');
//         CityCoin cityCoin = cityCoinTickerMapping[ticker];
//         require(cityCoin.owner() == address(this), 'transferCityCoinOwnership: factory contract is not owner');
//         cityCoin.transferOwnership(newOwner);
//     }

//     function getCityCoinOwner(string memory ticker) public view returns(address) {
//         require(exists[ticker], 'getCityCoinOwner: no city coin');
//         CityCoin cityCoin = cityCoinTickerMapping[ticker];
//         return cityCoin.owner();
//     }


// }