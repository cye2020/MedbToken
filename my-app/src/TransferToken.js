import React, { useState } from 'react';
import { ethers } from 'ethers';

const TransferToken = () => {
    const [receiver, setReceiver] = useState('');
    const [amount, setAmount] = useState('');
    const [transactionHash, setTransactionHash] = useState(null);

    const tokenAddress = '0xf92c0715D9CCb07F4fCcF97415cb9A561074fB73'; // token address
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

    const handleTransfer = async () => {
        // initialize provider and signer (Metamask)
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        console.log("Account:", await signer.getAddress());

        // create contract instance
        const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);

        // transfer tokens
        const amountToTransfer = ethers.parseUnits(amount, 'ether'); // assuming 'ether' as the token's decimals
        
        const estimation = await tokenContract.transfer.estimateGas(receiver, amountToTransfer); // estimate Gas Limit
        console.log("Estimated Gas:", estimation);

        const txResponse = await tokenContract.transfer(receiver, amountToTransfer);
        const txReceipt = await txResponse.wait();
        console.log("Receipt: ", txReceipt);

        // set transaction hash to state
        setTransactionHash(txReceipt.transactionHash);
    };

    return (
        <div>
            <input type="text" placeholder="Receiver's Address" onChange={e => setReceiver(e.target.value)} />
            <input type="text" placeholder="Amount to Transfer" onChange={e => setAmount(e.target.value)} />
            <button onClick={handleTransfer}>Transfer</button>
            {transactionHash && <p>Transaction Hash: {transactionHash}</p>}
        </div>
    );
};


export default TransferToken;
