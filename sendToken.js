const { ethers } = require('ethers');
const config = require("./config.json");

async function test() {
    const alchemyApiKey = 'drwJzab5REXNKrEN-yDYn1Hr5Zxq1-1j';
    const provider = new ethers.AlchemyProvider('goerli', alchemyApiKey);

    // Set up the wallet with the private key of wallet A
    const privateKeyA = config.privateKey;
    const walletA = new ethers.Wallet(privateKeyA, provider);

    // Set up the contract instance of the ERC-20 token
    const tokenAddress = '0xf92c0715D9CCb07F4fCcF97415cb9A561074fB73';
    const tokenAbi = [
        {
            "inputs": [
                {
                    "internalType": "contract IERC20",
                    "name": "_token",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ];
    const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, walletA);

    // Transfer tokens from wallet A to wallet B
    const walletBAddress = '0x7ddf5dFeF611e1153B9eB9Ef17064DD2ac59CDf1';
    const amount = ethers.parseUnits('500000', 'ether'); // 500000 tokens
    const transferTx = await tokenContract.transfer(walletBAddress, amount);

    console.log('Transfer transaction hash:', transferTx.hash);
    console.log("End Test");
}

test();