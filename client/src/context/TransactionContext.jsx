import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';


export const TransactionContext = React.createContext();


const { ethereum } = window;
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum); // Web3Provider
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionContract;
};



export const TransactionProvider = ({ children }) => { //Learn More About Context Providers in JavaScript :)

    const [currentAccount, setCurrentAccount] = useState("");

    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
    const [isLoading, setisLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const [transactions, settransactions] = useState([])

    //Requires Advanced Knowledge of React.js
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask and Use Ropsten Testnet");
            const transactionContract = getEthereumContract();
            const availableTransactions = await transactionContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            console.log(structuredTransactions);
            settransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    }

    const checkIfWalletIsConnected = async () => {

        try {

            if (!ethereum) return alert("Please Install Metamask and Use Ropsten Testnet");

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            }

            else {
                console.log('No Connected Accounts Found');
            }

            console.log(accounts);
        } catch (error) {
            console.log(error);

        }

    }

    const checkIfTransactionExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount = await transactionContract.getTransaction(); // getTransaction method of the smartContract
            window.localStorage.setItem('transactionCount', transactionCount)

        } catch (error) {
            // console.log(error); //use at the time of Debugging

            throw new Error("No Ethereum Object");
        }
    }
    //Function to link Button with Metamask Wallet
    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask and Use Ropsten Testnet");

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            location.reload();
        }
        catch (error) {
            // console.log(error);

            throw new Error("No Ethereum Object");
        }
    }

    // Method having logic of Transferring Test Ether
    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please Install Metamask and Use Ropsten Testnet");
            // Fetching Data From The Form

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract(); 
            const parsedAmount = ethers.utils.parseEther(amount); 
            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', //21000 GWEI
                    value: parsedAmount._hex, // 
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setisLoading(true);
            console.log(`${transactionHash.hash}`);
            await transactionHash.wait();
            setisLoading(false);
            alert("Transaction Sucessfull");
            console.log(`Sucessful Transaction Execution ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransaction(); // getTransaction method of the smartContract

            setTransactionCount(transactionCount.toNumber());
            location.reload() // reloads the window after sucessfull transaction
            
        } catch (error) {
            console.log(error);
            // throw new Error("Unable to Execute Transaction Due to Absence of Ethereum Object");
        }
    }

    // Checks if Metamask Wallet is Connected or Not 
    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionExist();
    }, []);



    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }} >
            {children}
        </TransactionContext.Provider>
    );

}

export default TransactionContext;