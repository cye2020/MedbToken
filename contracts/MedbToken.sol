// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts@4.7.3/token/ERC20/ERC20.sol";

contract MedbToken is ERC20 {
    constructor() ERC20("Medb", "MEDB") {
        _mint(msg.sender, 1000000 * (10 ** uint256(decimals())));
    }
}
