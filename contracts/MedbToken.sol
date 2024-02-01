// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts5.0.1/token/ERC20/ERC20.sol";

contract MedbToken is ERC20 {
    constructor() ERC20("Medb", "MEDB") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
