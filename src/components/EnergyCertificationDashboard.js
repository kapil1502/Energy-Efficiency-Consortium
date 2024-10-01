// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { Input, Button, Card, CardHeader, CardTitle, CardContent, Alert, AlertTitle, AlertDescription } from '../components-wrapper/ui';
// import { setupContract } from '../utils/contractSetup';

// const EnergyCertificationDashboard = () => {
//   const [contract, setContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [isOwner, setIsOwner] = useState(false);
//   const [isCertificateIssuer, setIsCertificateIssuer] = useState(false);

//   const [newIssuerAddress, setNewIssuerAddress] = useState('');
//   const [productId, setProductId] = useState('');
//   const [productName, setProductName] = useState('');
//   const [productModel, setProductModel] = useState('');
//   const [energyRating, setEnergyRating] = useState('');
//   const [certificationDocument, setCertificationDocument] = useState('');
//   const [issuingAuthority, setIssuingAuthority] = useState('');
//   const [validityPeriod, setValidityPeriod] = useState('');

//   const [certificationDetails, setCertificationDetails] = useState(null);
//   const [isCertificationValid, setIsCertificationValid] = useState(null);

//   useEffect(() => {
//     const init = async () => {
//       try {
//         const { contract, signer } = await setupContract();
//         setContract(contract);
//         const address = await signer.getAddress();
//         setAccount(address);

//         const ownerAddress = await contract.owner;
//         setIsOwner(address.toLowerCase() === ownerAddress.toLowerCase());

//         const isIssuer = await contract.certificateIssuers(address);
//         setIsCertificateIssuer(isIssuer);
//       } catch (error) {
//         console.error("An error occurred while initializing the app:", error);
//       }
//     };

//     init();
//   }, []);

//   const updateCertificateIssuer = async () => {
//     try {
//         const tx = await contract.updateCertificateIssuer(newIssuerAddress, true);
//         await tx.wait();
//         alert("Certificate issuer updated successfully!");
//       } catch (error) {
//         console.error("Error updating certificate issuer:", error);
//         alert("Error updating certificate issuer. Check console for details.");
//       }
//   };

//   const certifyProduct = async () => {
//     try {
//         const tx = await contract.certifyProduct(
//           ethers.utils.id(productId),
//           productName,
//           productModel,
//           energyRating,
//           certificationDocument,
//           issuingAuthority,
//           parseInt(validityPeriod)
//         );
//         await tx.wait();
//         alert("Product certified successfully!");
//       } catch (error) {
//         console.error("Error certifying product:", error);
//         alert("Error certifying product. Check console for details.");
//       }
//   };

//   const checkCertificationValidity = async () => {
//     try {
//       const result = await contract.isProductCertificationValid(ethers.utils.id(productId));
//       setIsCertificationValid(result);
//     } catch (error) {
//       console.error("Error checking certification validity:", error);
//       alert("Error checking certification validity. Check console for details.");
//     }
//   };

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">Energy Certification Dashboard</h1>
      
//       {account && (
//         <Alert className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4">
//           <AlertTitle>Connected Account</AlertTitle>
//           <AlertDescription>{account}</AlertDescription>
//         </Alert>
//       )}

//       {isOwner && (
//         <Card className="mb-4 bg-white rounded-lg shadow-lg p-6">
//           <CardHeader>
//             <CardTitle>Owner Actions</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Input
//               placeholder="New Issuer Address"
//               value={newIssuerAddress}
//               onChange={(e) => setNewIssuerAddress(e.target.value)}
//               className="mb-4 px-4 py-2 border border-gray-300 rounded-lg w-full"
//             />
//             <Button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-500">
//               Update Certificate Issuer
//             </Button>
//           </CardContent>
//         </Card>
//       )}

//       {/* Similar design updates for certificate issuer and product certification forms */}
//     </div>
//   );
// };

// export default EnergyCertificationDashboard;
