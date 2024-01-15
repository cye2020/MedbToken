// SPDX-License-Identifier: MIT

pragma solidity ^0.8.3;

import "@openzeppelin/contracts@4.7.3/token/ERC20/IERC20.sol";


contract TransferToken {
    IERC20 token;
    
    constructor(IERC20 _token) {
        token = _token;
    }

    modifier EnoughToken(uint _amount) {
        require(token.balanceOf(msg.sender) >= _amount, "Not enough token!");
        _;
    }

    function getBalance() external view returns(uint) {
        return token.balanceOf(msg.sender);
    }


    function transfer(address _to, uint _amount) external EnoughToken(_amount) {// Print the address of the caller
        token.transfer(_to, _amount);
    }
}

