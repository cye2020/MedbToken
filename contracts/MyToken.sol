// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20Burnable, Ownable {
    /**
     * @param name Token Name
     * @param symbol Token Symbol
     * @param totalSupply Token Supply
     */
    constructor(
        string memory name,
        string memory symbol,
        uint256 totalSupply
    ) ERC20(name, symbol) Ownable(msg.sender) {
        _mint(msg.sender, totalSupply);
    }

    function getAllowance(address owner, address spender, uint256 amount) public  {
        _approve(owner, spender, amount);
    }
}
