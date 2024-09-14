import { ethers } from "ethers";
import {
  AuthContractABI,
  AuthContractAddress,
  DocumentABI,
  DocumentAddress,
} from "../../Identity-Blockchain-Zk-snarks-main/Constant.js";
import { encryptString, JWT_SECREAT, wallet } from "../config.js";
import jwt from "jsonwebtoken";

export function login(req, res) {
  const { id, password } = req.body;
  if (id && password) {
    if (id === "govuser1" && password === "1234") {
      const token = jwt.sign({ id: id }, JWT_SECREAT, {
        expiresIn: "1h",
      });
      res.json({ token: token });
    } else {
      res.json({ token: null });
    }
  }
}

export async function addUser(req, res) {
  const { name, dob, adharId, address } = req.body;
  // const address = "0x7cfbf495bf66c26C73867B221c4301ef6463570d";
  if (name && dob && adharId && address) {

    console.log(name, dob, adharId, address);
    
    // Create contract instance
    const authContract = new ethers.Contract(
      AuthContractAddress,
      AuthContractABI,
      wallet
    );

    console.log("step 1");

    // // Call authUser to assign an auth key to the user
    const authUserTra = await authContract.authUser(address); // no need to store this in `res` since it doesn't return anything
    console.log("step 2");
    
    authUserTra.wait();
    console.log("step 3");

    const diffDof = dateDiff(dob);
    console.log(name, parseInt(diffDof), adharId, address )
    // Get the auth key for the user
    const key = await authContract.getAuthKey(address);
    console.log("sjdhbwfk"); // Await the result from the contract call

    // const encryptedData = encryptStringArray([Waddress, doB,uid,name], key);
    // const decrptedData = decryptStringArray(encryptedData, key);

    const enName = encryptString(name, key);
    const enDoB = encryptString((parseInt(diffDof)).toString(), key);
    const enUid = encryptString(adharId, key);

    //console.log("Encrypted Data: ", encryptedData);

    console.log("step 4");

    const documentContract = new ethers.Contract(
      DocumentAddress,
      DocumentABI,
      wallet
    );
    console.log("step 5");
    const tr = await documentContract.safeMint(address, enUid, enDoB, enName);
    console.log("step 6");
    await tr.wait();
    console.log("step 7");
    console.log("Safeminted Succefully: ", tr);

    //Check if a key was successfully assigned
    if (key && key.length > 0) {
      console.log("Auth key assigned:", key);
    } else {
      console.log("No auth key assigned or something went wrong.");
    }

    res.json({ message: "User added successfully" });
  } else {
    res.json({ message: "Invalid data" });
  }
}

function dateDiff(dateString) {
  // Convert the input string to a Date object
  const date = new Date(dateString);

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference between the two dates in milliseconds
  const diffInMs = currentDate.getTime() - date.getTime();

  // Convert the difference to seconds
  return Math.abs(diffInMs / 1000);
}
