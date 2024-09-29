import React, { useState } from 'react';
import { Button, Input, Card, CardHeader, CardContent } from '../components-wrapper/ui'; // Import your UI components
import { ethers } from 'ethers'; // Import ethers.js
import { contractAddress, contract_abi } from '../contract';

const VerifyCertificate = () => {
    const [productId, setProductId] = useState('');
    const [certificationData, setCertificationData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleVerify = async () => {
        try {
            if (!window.ethereum) {
                setErrorMessage('Please install MetaMask to use this feature.');
                return;
            }

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contract_abi, signer);

            // Call the getProductCertification function
            const data = await contract.getProductCertification(productId);
            setCertificationData(data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Error retrieving certification data');
            setCertificationData(null);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <CardHeader>
                    <h2 className="text-2xl font-bold mb-4 text-center">Verify Product Certification</h2>
                </CardHeader>
                <CardContent>
                    <Input
                        className="mb-4"
                        placeholder="Enter Product ID"
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                    />
                    <Button
                        onClick={handleVerify}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Verify
                    </Button>

                    {errorMessage && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>
                    )}

                    {certificationData && (
                        <div className="mt-6 p-4 border border-gray-300 rounded-lg shadow-lg">
                            <h3 className="text-lg font-semibold mb-2 text-blue-500">Certification Details</h3>
                            <p><strong>Product Name:</strong> {certificationData.productName}</p>
                            <p><strong>Product Model:</strong> {certificationData.productModel}</p>
                            <p><strong>Energy Rating:</strong> {certificationData.energyRating}</p>
                            <p>
                                <strong>Certification Document:</strong>
                                <a 
                                    href={`https://gateway.pinata.cloud/ipfs/${certificationData.certificationDocument}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-blue-600 underline hover:text-blue-800"
                                >
                                    View Document
                                </a>
                            </p>
                            <p><strong>Issuing Authority:</strong> {certificationData.issuingAuthority}</p>
                            <p><strong>Valid Until:</strong> {new Date(certificationData.validUntil * 1000).toLocaleDateString()}</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default VerifyCertificate;