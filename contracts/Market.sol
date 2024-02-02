// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts@5.0.1/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts@5.0.1/access/Ownable.sol";


contract Market is Ownable {
    // ERC-20 토큰 주소
    IERC20 public token;

    // 이벤트: 아이템 구매
    event ItemPurchased(address indexed buyer, uint256 itemId, uint256 quantity);

    event GoodsRegistered(address indexed owner, uint256 itemId);


    uint256 id;

    // 아이템
    struct Item {
        string name;
        uint256 price;
        uint256 quantity;
        address owner;
    }

    // 아이템 목록
    mapping(uint256 => Item) public items;

    // 생성자 - ERC-20 토큰 주소 설정
    constructor(address _tokenAddress) Ownable() {
        token = IERC20(_tokenAddress);
    }

    // 아이템 등록 함수
    function registerGoods(string memory name, uint256 price, uint256 quantity) external onlyOwner(){
        items[id++] = (Item(name, price, quantity, msg.sender));
    }

    // 아이템 구매 함수
    function purchaseGoods(uint256 itemId, uint256 quantity) external {
        require(items[itemId].quantity >= quantity, "Insufficient goods quantity");

        uint256 totalPrice = items[itemId].price * quantity;  // 가격 로직을 필요에 따라 추가
        require(token.balanceOf(msg.sender) >= totalPrice, "Insufficient funds");

        require(items[itemId].owner == owner(), "Incorrect owner");
        // 아이템 판매자에게 토큰 전송
        token.transferFrom(msg.sender, owner(), totalPrice);

        // 아이템 목록 갱신
        items[itemId].quantity -= quantity;

        // 이벤트 발생
        emit ItemPurchased(msg.sender, itemId, quantity);
    }
}
