import { ethers } from 'ethers';

// Replace with your contract ABI and address
const CONTRACT_ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "issuer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			}
		],
		"name": "CertificateIssuerUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_productId",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productModel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_energyRating",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_certificationDocument",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_issuingAuthority",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_validityPeriod",
				"type": "uint256"
			}
		],
		"name": "certifyProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "productId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productModel",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "energyRating",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "certificationDocument",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "issuingAuthority",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "validUntil",
				"type": "uint256"
			}
		],
		"name": "ProductCertified",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_issuer",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "_approved",
				"type": "bool"
			}
		],
		"name": "updateCertificateIssuer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "certificateIssuers",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_productId",
				"type": "bytes32"
			}
		],
		"name": "getProductCertification",
		"outputs": [
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productModel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "energyRating",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certificationDocument",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issuingAuthority",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "validUntil",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_productId",
				"type": "bytes32"
			}
		],
		"name": "isProductCertificationValid",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "productCertifications",
		"outputs": [
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productModel",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "energyRating",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certificationDocument",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "issuingAuthority",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "validUntil",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]; // Add your contract ABI here
const CONTRACT_ADDRESS = "0x7bfc0E04367470998858454C499B9c70ae19680A"; // Add your contract address here

export const setupContract = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      return { contract, signer };
    } catch (error) {
      console.error("An error occurred while setting up the contract:", error);
      throw error;
    }
  } else {
    throw new Error("Please install MetaMask!");
  }
};