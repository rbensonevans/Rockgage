// contracts/RealEstCoin.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title RockgageWallet
 * @dev RockgageWallet. 
 */
contract RockgageWallet {

    address private owner;
      
    // modifier to check if caller is owner
    modifier isOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }


    struct UserCashAccount {
        address accountHolder;
        uint balanceUSD;
        uint balanceROCK;
        uint pledgedAmountUSD;
        uint pledgedAmountReceivedROCK;
    }
 
     mapping(address => UserCashAccount) private userCashAccount;

    constructor() {
        owner = msg.sender; // 'msg.sender' is the contract deployer
    }

    function createUserCashAccount(address accountHolder) external {  
        require(userCashAccount[accountHolder].accountHolder != address(0), "Account exists already");

        userCashAccount[accountHolder] = UserCashAccount(accountHolder, 0, 10000, 10000, 10000);
    }
}
