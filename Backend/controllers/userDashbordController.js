import { ethers } from "ethers";
import {
  AuthContractABI,
  AuthContractAddress,
  DocumentABI,
  DocumentAddress,
} from "../../Identity-Blockchain-Zk-snarks-main/Constant.js";
import { wallet } from "../config.js";
import crypto from 'crypto';

const nonceStore = {};

export function getNonce(req, res) {
  const nonce = Math.floor(Math.random() * 1000000);
  const { address } = req.body;

  nonceStore[address] = nonce;
  console.log(nonceStore);

  return res.send(nonce.toString());
}

export async function verifyAndGetUserData(req, res) {
  const { address, signature } = req.body;
  const nonce = nonceStore[address];

  if (!nonce) {
    return res.status(400).send("Nonce not found for this address");
  }

  const expectedMessage = `I am signing my one-time nonce: ${nonce}`;

  delete nonceStore[address];

  try {
    const recoveredAddress = ethers.utils.verifyMessage(
      expectedMessage,
      signature
    );

    console.log("Recovered Address:", recoveredAddress);

    if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
      //! get data from database

      const { name, dob, adharId, walletAddress } = await getData(address);

      

      res.json({
        name: name,
        dob: dob,
        adharId: adharId,
        walletAddress: walletAddress,
      });
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (error) {
    console.error("Error verifying signature:", error);
    res.status(500).send("Internal Server Error");
  }
}

function decryptString(encryptedData, key) {
  const algorithm = "aes-256-cbc";

  // Split the iv and encrypted content
  const [ivHex, encrypted] = encryptedData.split(":");
  const iv = Buffer.from(ivHex, "hex");

  // Create decipher with the key and iv
  const decipher = crypto.createDecipheriv(
    algorithm,
    crypto.scryptSync(key, "salt", 32),
    iv
  );

  // Decrypt the content
  let decrypted = decipher.update(encrypted, "hex", "utf-8");
  decrypted += decipher.final("utf-8");
  return decrypted;
}

async function getData(address) {
  const authContract = new ethers.Contract(
    AuthContractAddress,
    AuthContractABI,
    wallet
  );
  const key = await authContract.getAuthKey(address); // Await the result from the contract call

  console.log("the key is : ", key);
  const documentContract = new ethers.Contract(
    DocumentAddress,
    DocumentABI,
    wallet
  );
  const data = await documentContract.fetchDocument(address);

  let { uid, dob, name } = data;
  const orginalUID = decryptString(uid, key);
  const orginalDoB = decryptString(dob, key);
  const orginalName = decryptString(name, key);

  return {
    name: orginalName,
    dob: orginalDoB,
    adharId: orginalUID,
    walletAddress: address,
  };
}
