// contracts/RealEstCoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// RealEstCoin.
// initial supply: 1 trillion tokens.
// 1000000000000 * 10^18
// 1000000000000000000000000000000

contract RockgageToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("RockgageToken", "ROCK") {
        _mint(msg.sender, initialSupply);
    }
}