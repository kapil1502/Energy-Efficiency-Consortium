import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components-wrapper/ui';

const NavBar = () => {
    const [account, setAccount] = useState(null);
    const [error, setError] = useState('');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAccount(accounts[0]);
                setError('');
            } catch (err) {
                console.error(err);
                setError('Failed to connect to wallet.');
            }
        } else {
            setError('MetaMask is not installed. Please install it to use this feature.');
        }
    };

    return (
        <nav className="bg-green-600 shadow-lg">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <div className="text-white font-bold text-xl">
                    <Link to="/">Energy Certification</Link>
                </div>
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/certify-product" className="text-white hover:text-gray-200 transition duration-300">
                            Certify Product
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage-issuers" className="text-white hover:text-gray-200 transition duration-300">
                            Manage Issuers
                        </Link>
                    </li>
                    <li>
                        <Link to="/verify-certification" className="text-white hover:text-gray-200 transition duration-300">
                            Verify Certificate
                        </Link>
                    </li>
                </ul>
                <div className="flex items-center space-x-4">
                    {account ? (
                        <span className="text-white">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                    ) : (
                        <Button onClick={connectWallet} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                            Connect Wallet
                        </Button>
                    )}
                    {error && (
                        <div className="text-red-500">{error}</div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
