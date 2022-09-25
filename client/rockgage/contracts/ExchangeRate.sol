// contracts/RealEstCoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title ExchangeRate
 * @dev Set & change the ExchangeRate. 
 */
contract ExchangeRate {

    address private owner;
       
    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    struct ExchangeInfo {
        string name; // ROCK-USD
        uint rate;  // In terms of 1 USD.
        string displayName; // 1 ROCK / 1 USD
    }
    
    mapping(string => ExchangeInfo) public ExchangeMap;

    constructor() {
        owner = msg.sender; // 'msg.sender' is the contract deployer for a constructor
        addExchangeRate('ROCK-USD', 1, '1 ROCK / 1 USD');
    }


    function addExchangeRate(string memory name, uint rate, string memory displayName) public isOwner {
        ExchangeMap[name] = ExchangeInfo(name, rate, displayName);
    }


    function setExchangeRate(string memory name, uint rate, string memory displayName) public isOwner {
        ExchangeMap[name].rate = rate;
        ExchangeMap[name].displayName = displayName;
    }


    function getExchangeRate(string memory name) external view returns (uint) {
        return ExchangeMap[name].rate;
    }


    function getDisplayName(string memory name) external view returns (string memory) {
        return ExchangeMap[name].displayName;
    }
}
