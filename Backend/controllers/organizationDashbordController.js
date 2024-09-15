import { ethers } from "ethers";
import {
  AuthContractABI,
  AuthContractAddress,
  DocumentABI,
  DocumentAddress,
} from "../../Identity-Blockchain-Zk-snarks-main/Constant.js";
import { wallet } from "../config.js";
import fs from "fs";
import crypto from "crypto";
import * as circomlibjs from "circomlibjs";
import * as snarkjs from "snarkjs";
import { ReportABI, ReportAddress } from "../Constant.js";

export async function verifyAndCheckUserFromOrganization(req, res) {
  const { walletAddress } = req.body;

  try {
    if (walletAddress.toLowerCase()) {
      const data = await checkKyc(walletAddress, res);

      return res.json({ isAuthorized: data });
    } else {
      return res.status(401).json({ isAuthorized: false });
    }
  } catch (error) {
    console.error("Error verifying signature:", error);
    return res.status(500).send("Internal Server Error");
  }
}

async function checkKyc(address) {
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

  //return console.log(address, orginalDoB, currentTimestamp, ageThreshold,orginalUID,name);

  const ageThreshold = 18; // Example: 18 years
  console.log("Creating age proof...");

  name = ethers.utils.sha256(ethers.utils.toUtf8Bytes(name));
  console.log("New Encrypted Name: ", name);
  const { proof, publicSignals } = await createAgeProof(
    address,
    orginalDoB,
    ageThreshold,
    orginalUID,
    name
  );

  if (proof == null || publicSignals == null) {
    return false;
  }

  console.log("Proof:", proof);
  console.log("Public Signals:", publicSignals);

  console.log("Verifying age proof...");
  const verificationResult = await verifyAgeProof(proof, publicSignals);

  // Create a contract instance
  const repContract = new ethers.Contract(ReportAddress, ReportABI, wallet);
  const rep = await repContract.fetchDocuments(address);

  let repproof;
  let reppublicSignals;
  console.log("Report length: ", rep);
  
  if (rep != null) {
    const data = await createNegNftProof(rep.length);
    repproof = data.repproof;
    reppublicSignals = data.reppublicSignals;
  }
  else {
    const data = await createNegNftProof(0);
    repproof = data.repproof;
    reppublicSignals = data.reppublicSignals;
  }
  const repRes = await verifyNegNftProof(repproof, reppublicSignals);

  //! --------------------
  let result = false;
  if (reppublicSignals[0] == "0") {
    result = false;
  } else {
    result = true;
  }

  if (verificationResult && result && repRes) {
    return true;
  } else {
    return false;
  }
}

async function createAgeProof(
  address,
  doBTimestamp,
  ageThreshold,
  uid,
  name
) {
  // Generate the Poseidon hash
  const hash = await poseidonHash([address, doBTimestamp, uid, name]);
  console.log("Creating Poseidon Hash: ", hash);
  console.log([address, doBTimestamp, uid, name]);
  console.log("wieniec");
  // Generate zk-SNARK proof and public signals

  try {
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(
      {
        address: address,
        doBTimestamp: doBTimestamp,
        ageThreshold: ageThreshold,
        hash: hash,
        uid: uid,
        name: name,
      },
      "../Backend/controllers/age_proof.wasm",
      "../Backend/controllers/circuit_age.zkey"
    );

    return { proof, publicSignals };
  } catch (error) {
    return { proof: null, publicSignals: null };
  }
}

async function verifyAgeProof(proof, publicSignals) {
  // Load the verification key for the zk-SNARK circuit
  const vKey = JSON.parse(
    fs.readFileSync("../Backend/controllers/verification_key_age.json")
  );

  // // Verify the zk-SNARK proof using snarkjs
  const res = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  return res;
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

async function poseidonHash(inputs) {
  const poseidon = await circomlibjs.buildPoseidon();
  const poseidonHash = poseidon.F.toString(poseidon(inputs));
  return poseidonHash;
}

async function createNegNftProof(length) {
  const { proof, publicSignals } = await snarkjs.groth16.fullProve(
    {
      x: length,
    },
    "../Backend/controllers/negative_nft.wasm",
    "../Backend/controllers/circuit_neg_nft.zkey"
  );
  return { repproof: proof, reppublicSignals: publicSignals };
}

async function verifyNegNftProof(proof, publicSignals) {
  // Load the verification key for the zk-SNARK circuit
  const vKey = JSON.parse(
    fs.readFileSync("../Backend/controllers/verification_key_neg_nft.json")
  );
  // // Verify the zk-SNARK proof using snarkjs
  const repRes = await snarkjs.groth16.verify(vKey, publicSignals, proof);

  return repRes;
}

//! MPC function
