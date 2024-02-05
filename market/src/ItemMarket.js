import React, { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers'; // Import ethers library
import MarketContract from './contracts/Market.json';

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contract, setContract] = useState(null);
    const [items, setItems] = useState([]);
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState('');

    const fetchData = useCallback(async () => {
        if (contract) {
        const itemsCount = await contract.id();
        const fetchedItems = [];

        for (let i = 0; i < itemsCount; i++) {
            const item = await contract.items(i);
            fetchedItems.push(item);
        }

        setItems(fetchedItems);
        }
    }, [contract]);

    const initEthers = async () => {
        if (window.ethereum) {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const web3Provider = new ethers.BrowserProvider(window.ethereum);
            const currentSigner = web3Provider.getSigner();
      
            setProvider(web3Provider);
            setSigner(currentSigner);
      
            // Get and set the initial accounts
            const initialAccounts = await web3Provider.listAccounts();
            setAccounts(initialAccounts);
      
            // Get the network information
            const networkId = await web3Provider.getNetwork();
      
            if (networkId && networkId.chainId !== undefined) {
              // Access the chainId property if it exists
              console.log('Chain ID:', networkId.chainId);
      
              const deployedNetwork = MarketContract.networks[networkId.chainId];
              const contractInstance = new ethers.Contract(
                deployedNetwork.address,
                MarketContract.abi,
                currentSigner
              );
      
              setContract(contractInstance);
      
              // Listen for account changes
              window.ethereum.on('accountsChanged', (newAccounts) => {
                setAccounts(newAccounts);
              });
      
              // ... (additional code you want to include after setting the contract)
      
            } else {
              console.error('Network information is undefined or missing chainId property.');
            }
      
          } catch (error) {
            console.error('Error while connecting to Ethereum', error);
          }
        } else {
          console.error('Ethereum provider not found. Please install MetaMask or use a Web3-enabled browser.');
        }
      };

  useEffect(() => {
    initEthers();
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleItemRegistration = async () => {
    try {
      await contract.registerItem(itemName, itemPrice, itemQuantity);
      setItemName('');
      setItemPrice('');
      setItemQuantity('');
      fetchData();
    } catch (error) {
      console.error('Item Registration Error:', error);
    }
  };

  const handleItemPurchase = async (itemId, quantity) => {
    try {
      await contract.purchaseItem(itemId, quantity);
      fetchData();
    } catch (error) {
      console.error('Item Purchase Error:', error);
    }
  };

  return (
    <div className="App">
      <h1>Marketplace React App</h1>
      <p>Connected Account: {accounts.length > 0 ? accounts[0].address : 'Not connected'}</p>
      <h2>Items</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong> - Price: {item.price} - Quantity: {item.quantity}
            <button onClick={() => handleItemPurchase(index, 1)}>Purchase</button>
          </li>
        ))}
      </ul>
      <h2>Register Item</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleItemRegistration(); }}>
        <label>Name:
          <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />
        </label>
        <label>Price:
          <input type="number" value={itemPrice} onChange={(e) => setItemPrice(e.target.value)} required />
        </label>
        <label>Quantity:
          <input type="number" value={itemQuantity} onChange={(e) => setItemQuantity(e.target.value)} required />
        </label>
        <button type="submit">Register Item</button>
      </form>
    </div>
  );
}

export default App;
