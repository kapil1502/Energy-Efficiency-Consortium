import React, { useState } from 'react';

const WalletConnect = ({ onConnect }) => {
    const [account, setAccount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                onConnect(accounts[0]);
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('Error connecting to MetaMask. Please try again.');
                console.error('Connection error:', error);
            }
        } else {
            setErrorMessage('MetaMask is not installed. Please install it to connect your wallet.');
        }
    };

    return (
        <div className="mb-4">
            <button
                onClick={connectWallet}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect MetaMask'}
            </button>
            {errorMessage && (
                <div className="mt-2 text-red-700">{errorMessage}</div>
            )}
        </div>
    );
};

export default WalletConnect;
