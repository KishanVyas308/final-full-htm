import { ethers } from "ethers";
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECREAT = "jwt_secret";

export const USER_DASHBOARD_FRONTEND_SITE = "http://localhost:4321";
export const GROW_BACKEND_SITE = "http://localhost:3000";
export const GOV_DASHBOARD_FRONTEND_SITE = "http://localhost:5173";
export const GROW_API_KEY = "grow_api_key";



export const providerUrl = "https://node.ghostnet.etherlink.com"; // or other Ethereum provider URL
export const contractAddress = "0x1c784D77C49060187808391c3d188025a983A3C5";  // Replace with your deployed contract address
export const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256[2]",
				"name": "_pA",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[2][2]",
				"name": "_pB",
				"type": "uint256[2][2]"
			},
			{
				"internalType": "uint256[2]",
				"name": "_pC",
				"type": "uint256[2]"
			},
			{
				"internalType": "uint256[6]",
				"name": "_pubSignals",
				"type": "uint256[6]"
			}
		],
		"name": "verifyProof",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Create a provider (Infura, Alchemy, or a local node)
const provider = new ethers.providers.JsonRpcProvider(providerUrl);

// Create a signer (optional, only needed for write operations)
// This can be a wallet with a private key or connected to MetaMask
const privateKey = process.env.PRIVATE_KEY;  // Replace with your private key if signing transactions
export const wallet = new ethers.Wallet(privateKey, provider);






export function encryptString(data, key) {
    const algorithm = 'aes-256-cbc'; // AES encryption algorithm
    const iv = crypto.randomBytes(16); // Initialization vector (random)

    // Create cipher with the key and iv
    const cipher = crypto.createCipheriv(algorithm, crypto.scryptSync(key, 'salt', 32), iv);

    // Encrypt the data
    let encrypted = cipher.update(data, 'utf-8', 'hex');
    encrypted += cipher.final('hex');

    // Combine iv and encrypted content
    const encryptedData = iv.toString('hex') + ':' + encrypted;
    return encryptedData;
}