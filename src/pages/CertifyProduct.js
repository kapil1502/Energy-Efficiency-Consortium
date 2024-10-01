import React, { useState } from 'react';
import { ethers } from 'ethers';
import { setupContract } from '../utils/contractSetup';
import { Button, Input, Card, CardHeader, CardContent } from '../components-wrapper/ui';

const PINATA_API_KEY = '263f9b2c04c1097e2fee';
const PINATA_SECRET_API_KEY = '9f7f35539949ccf19945db0aa372a08404997a980c30083522ac94dd8112b8a3'; // Use your actual Secret Key

const uploadToPinata = async (file) => {
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";
    
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_SECRET_API_KEY
        },
        body: formData
    });

    if (response.ok) {
        const data = await response.json();
        return data.IpfsHash;
    } else {
        throw new Error("Failed to upload to Pinata: " + await response.text());
    }
};

const CertifyProduct = () => {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [energyRating, setEnergyRating] = useState('');
    const [certificationDocument, setCertificationDocument] = useState(null);
    const [issuingAuthority, setIssuingAuthority] = useState('');
    const [validityPeriod, setValidityPeriod] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (e) => {
        setCertificationDocument(e.target.files[0]);
    };

    const certifyProduct = async () => {
        try {
            if (!certificationDocument) {
                setErrorMessage('Please upload a certification document.');
                return;
            }

            const ipfsHash = await uploadToPinata(certificationDocument);
            console.log('Uploaded to IPFS with hash:', ipfsHash);

            const { contract } = await setupContract();
            const productIdHash = ethers.utils.id(productId);
            const tx = await contract.certifyProduct(
                productIdHash,
                productName,
                productModel,
                energyRating,
                ipfsHash,
                issuingAuthority,
                parseInt(validityPeriod)
            );
            await tx.wait();
            alert('Product certified successfully!');
        } catch (error) {
            console.error('Error certifying product:', error);
            setErrorMessage('Error certifying product. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-blue-500">
            <Card className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                <CardHeader>
                    <h2 className="text-2xl font-bold mb-4 text-center">Certify Product</h2>
                </CardHeader>
                <CardContent>
                    <Input className="mb-4" placeholder="Product ID" value={productId} onChange={(e) => setProductId(e.target.value)} />
                    <Input className="mb-4" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    <Input className="mb-4" placeholder="Product Model" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
                    <Input className="mb-4" placeholder="Energy Rating" value={energyRating} onChange={(e) => setEnergyRating(e.target.value)} />
                    <Input 
                        type="file" 
                        className="mb-4" 
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                    />
                    <Input className="mb-4" placeholder="Issuing Authority" value={issuingAuthority} onChange={(e) => setIssuingAuthority(e.target.value)} />
                    <Input className="mb-4" placeholder="Validity Period (in seconds)" value={validityPeriod} onChange={(e) => setValidityPeriod(e.target.value)} />
                    <Button onClick={certifyProduct} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                        Certify Product
                    </Button>

                    {errorMessage && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">{errorMessage}</div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default CertifyProduct;