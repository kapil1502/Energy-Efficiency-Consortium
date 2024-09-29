import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardHeader, CardContent } from '../components-wrapper/ui';
import { ethers } from 'ethers'; // Assuming you are using ethers.js
import { contractAddress, contract_abi } from "../contract"; // Import contract ABI and address

const ManageIssuers = () => {
  const [issuerAddress, setIssuerAddress] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [issuers, setIssuers] = useState([]);

  useEffect(() => {
    loadIssuers();
  }, []);

  // Function to load existing issuers from the smart contract
  const loadIssuers = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contract_abi, signer);

      // Fetch the list of certificate issuers
      const issuerAddresses = []; // Logic to fetch issuers
      setIssuers(issuerAddresses);
    } catch (error) {
      console.error('Error loading issuers:', error);
    }
  };

  // Function to update the issuer's approval status
  const updateIssuerApproval = async () => {
    try {
      if (!issuerAddress) {
        setErrorMessage('Please enter a valid issuer address.');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contract_abi, signer);

      // Call the smart contract function to update issuer approval
      await contract.updateCertificateIssuer(issuerAddress, isApproved);
      setErrorMessage('');
      loadIssuers(); // Reload the issuers to reflect changes
      setIssuerAddress('');
      setIsApproved(false);
    } catch (error) {
      setErrorMessage('An error occurred while updating the issuer status.');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
      <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4 text-center">Manage Certificate Issuers</h2>
        </CardHeader>
        <CardContent>
          <Input
            className="mb-4"
            placeholder="Issuer Address"
            value={issuerAddress}
            onChange={(e) => setIssuerAddress(e.target.value)}
          />
          <label className="inline-flex items-center mb-4">
            <input
              type="checkbox"
              checked={isApproved}
              onChange={(e) => setIsApproved(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">
              {isApproved ? 'Approve Issuer' : 'Remove Issuer'}
            </span>
          </label>
          <Button onClick={updateIssuerApproval} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Update Issuer Status
          </Button>

          {errorMessage && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>
          )}

          {issuers.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Current Issuers:</h3>
              <ul>
                {issuers.map((issuer, index) => (
                  <li key={index} className="p-2 border-b border-gray-300">{issuer}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageIssuers;
