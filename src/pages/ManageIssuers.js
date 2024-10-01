import React, { useState, useEffect } from 'react';
import { Button, Input, Card, CardHeader, CardContent } from '../components-wrapper/ui';
import { setupContract } from '../utils/contractSetup';

// Not here we have to make changes the logic is not good.

const ManageIssuers = () => {
  const [contract, setContract] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [issuerAddress, setIssuerAddress] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [issuers, setIssuers] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const { contract, signer } = await setupContract();
        setContract(contract);
        const address = await signer.getAddress();

        const ownerAddress = await contract.owner;
        setIsOwner(address.toLowerCase() === ownerAddress.toLowerCase());

        const isIssuer = await contract.certificateIssuers(address);
        if(isIssuer)
          setIssuers(issuers.push(address));
    
      } catch (error) {
        console.error("An error occurred while initializing the app:", error);
      }
    };

    init();
  }, []);

  // const loadIssuers = async () => {
  //   try {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contract = new ethers.Contract(contractAddress, contract_abi, signer);

  //     // Fetch the list of certificate issuers
  //     const issuerAddresses = []; // Logic to fetch issuers
  //     setIssuers(issuerAddresses);
  //   } catch (error) {
  //     console.error('Error loading issuers:', error);
  //   }
  // };

  // Function to update the issuer's approval status
  const updateIssuerApproval = async () => {
    try {
      if (!issuerAddress) {
        setErrorMessage('Please enter a valid issuer address you want to give an authority for.');
        return;
      }

      if(!isOwner){
        setErrorMessage('You are not authorized to managing the issuers.');
        return;    
      }

      const tx=await contract.updateCertificateIssuer(issuerAddress, isApproved);
      await tx.wait();
      setErrorMessage('');
      alert("Certificate issuer updated successfully!");

    } catch (error) {
      setErrorMessage('An error occurred while updating the issuer status.');
      console.error(error);
      alert("Error certifying product. Check console for details.");
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
