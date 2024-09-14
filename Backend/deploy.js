import { ethers } from "ethers";
import {contractBytecode, contractABI} from './Constant.js';
// RPC URL for Etherlink Ghosnet testnet
const rpcURL = 'https://node.ghostnet.etherlink.com'; // Correct RPC URL
const provider = new ethers.JsonRpcProvider(rpcURL);

// Replace with your Ethereum address and private key
const account = '0x7308f1e2E8F4FD608fBF029c2D71F5669770d4E0'; // Your account address here
const privateKey = '6a8007b5abf3e49924bf05bd52fc9dffa4b28a839360be1bfce47bb38f108963'; // Your private key here

// Create a wallet with the private key and connect it to the provider
const wallet = new ethers.Wallet(privateKey, provider);

// Contract ABI and Bytecode
// const contractABI = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256[2]",
// 				"name": "_pA",
// 				"type": "uint256[2]"
// 			},
// 			{
// 				"internalType": "uint256[2][2]",
// 				"name": "_pB",
// 				"type": "uint256[2][2]"
// 			},
// 			{
// 				"internalType": "uint256[2]",
// 				"name": "_pC",
// 				"type": "uint256[2]"
// 			},
// 			{
// 				"internalType": "uint256[6]",
// 				"name": "_pubSignals",
// 				"type": "uint256[6]"
// 			}
// 		],
// 		"name": "verifyProof",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ];

// Replace with the bytecode of the compiled contract


// Create a contract factory
const contractFactory = new ethers.ContractFactory(contractABI, contractBytecode, wallet);

// Deploy the contract
async function deployContract() {
    try {
        console.log('Deploying contract...');
        const contract = await contractFactory.deploy();
        console.log('Contract deployment transaction hash:', contract);

        // Wait for deployment to be mined
        // await contract.wait();
		const adddd = contract.address;
        console.log('Contract deployed at:', adddd);
        console.log('Contract deployed in block:', (await provider.getBlockNumber()).toString());

        return contract;
    } catch (error) {
        console.error('Error deploying contract:', error.message);
        throw error; // Rethrow error to handle in the main function
    }
}



// Main function
(async () => {
    try {
        const contract = await deployContract();
        await contract.wait();
    } catch (error) {
        console.error('Error in main function:', error.message);
	}
})();
