import { ethers } from "ethers";
import * as snarkjs from "snarkjs";
import fs from "fs";
import crypto from 'crypto';
import { buildPoseidon } from 'circomlibjs';
import * as circomlibjs from 'circomlibjs';
import { AuthContractABI, AuthContractAddress, DocumentAddress, DocumentABI } from './Constant.js';

// Load environment variables from .env file
// dotenv.config();
// Define contract details (replace with your actual values)
const providerUrl = "https://node.ghostnet.etherlink.com"; // or other Ethereum provider URL
const contractAddress = "0x1c784D77C49060187808391c3d188025a983A3C5";  // Replace with your deployed contract address
const contractABI = [
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
const privateKey = "6a8007b5abf3e49924bf05bd52fc9dffa4b28a839360be1bfce47bb38f108963";  // Replace with your private key if signing transactions
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);
// Poseidon hash function (assuming it's implemented somewhere)
async function poseidonHash(inputs) {
  const poseidon = await circomlibjs.buildPoseidon();
  const poseidonHash = poseidon.F.toString(poseidon(inputs));
  return poseidonHash;
}


async function registerUser(Waddress, doB, name, uid) {
    
}



function decryptString(encryptedData, key) {
    const algorithm = 'aes-256-cbc';

    // Split the iv and encrypted content
    const [ivHex, encrypted] = encryptedData.split(':');
    const iv = Buffer.from(ivHex, 'hex');

    // Create decipher with the key and iv
    const decipher = crypto.createDecipheriv(algorithm, crypto.scryptSync(key, 'salt', 32), iv);

    // Decrypt the content
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}




async function main() {
  try {
    //console.log(contract.address);
    // Example inputs (replace with actual values)
    const address = "0x123456789abcdef";
    const doBTimestamp = 946684800; // Example: January 1, 2000 (in seconds)
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds
    const ageThreshold = 18 * 365 * 24 * 60 * 60; // Example: 18 years in seconds
    const uid = "12345";
    const name = "0x123456789abcdef";
    // Deploy a dummy dIdentityContract (replace with actual contract instance)
    const dIdentityContract = {
      getID: async (address) => {
        // Example: return a mock identity object
        return { dobHash: "0x123456789abcdef" };
      },
    };

    // Step 1: Create Age Proof
    // console.log("Creating age proof...");
    // const { proof, publicSignals } = await createAgeProof(address, doBTimestamp, currentTimestamp, ageThreshold,uid,name);
    // console.log("Proof:", proof);
    // console.log("Public Signals:", publicSignals);

    // // Step 2: Verify Age Proof
    
    // console.log("Verifying age proof...");
    // const verificationResult = await verifyAgeProof(address, proof, publicSignals, dIdentityContract);
    // console.log("Verification Result:", verificationResult);


    // const data = "yash";
    // const encryptedData = encryptString(data, "6a8007b5abf3e49924bf05bd52fc9dffa4b28a839360be1bfce47bb38f108963");
    // console.log("Encrypted Data: ", encryptedData);
    // const decrptedData = decryptString("04020191266857ab991945310c0073ff:062cc193d772e4a3634cb156556de776", );
    // console.log("Decrypted Data: ", decrptedData);


    // const k = await registerUser("0xDca60Cb8F4E7409e2FC4b028973bbFA56caD2578", "dob", "name", "uid");
    // const decrptedData = decryptString("04020191266857ab991945310c0073ff:062cc193d772e4a3634cb156556de776", k);
    // console.log("Decrypted Data: ", decrptedData);

    
   // registerUser("0xf4CbC39c728C1cd47e0F06ef8698Dd512c5f06Fa", "123456", "NAME", "15689"); 
    getData("0xf4CbC39c728C1cd47e0F06ef8698Dd512c5f06Fa");
  //console.log( stringToBigInt("NAME"))

  
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the main function
main();
