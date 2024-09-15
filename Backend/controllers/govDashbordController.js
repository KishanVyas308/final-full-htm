import { ethers } from "ethers";
import {
  AuthContractABI,
  AuthContractAddress,
  DocumentABI,
  DocumentAddress,
} from "../../Identity-Blockchain-Zk-snarks-main/Constant.js";
import { encryptString, JWT_SECREAT, wallet } from "../config.js";
import jwt from "jsonwebtoken";
import { ReportABI, ReportAddress } from "../Constant.js";

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

    const diffDof = calculateAgeDifference(dob);
    console.log(name, diffDof, adharId, address);
    // Get the auth key for the user
    const key = await authContract.getAuthKey(address);
    console.log("sjdhbwfk"); // Await the result from the contract call

    // const encryptedData = encryptStringArray([Waddress, doB,uid,name], key);
    // const decrptedData = decryptStringArray(encryptedData, key);

    const enName = encryptString(name, key);
    const enDoB = encryptString(parseInt(diffDof).toString(), key);
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

function calculateAgeDifference(dob) {
  const currentDate = new Date();

  // Convert both dates to Date objects
  const dobDate = new Date(dob);
  const current = new Date(currentDate);

  // Extract year, month, and day for both dates
  let years = current.getFullYear() - dobDate.getFullYear();
  let months = current.getMonth() - dobDate.getMonth();
  let days = current.getDate() - dobDate.getDate();

  // Adjust if the current month and day is before the birth month and day
  if (months < 0 || (months === 0 && days < 0)) {
    years--; // Subtract 1 year
    months += 12; // Add 12 to months
  }

  // If days are negative, adjust by reducing months and recalculating days
  if (days < 0) {
    months--;
    const previousMonth =
      current.getMonth() === 0 ? 11 : current.getMonth() - 1;
    const daysInPreviousMonth = new Date(
      current.getFullYear(),
      previousMonth + 1,
      0
    ).getDate();
    days += daysInPreviousMonth;
  }

  return years;
}

export async function negativeMint(req, res) {
  const { to, subject, description, company } = req.body;
  // Create a contract instance
  const repContract = new ethers.Contract(ReportAddress, ReportABI, wallet);
  const mint = await repContract.negativeMint(
    to,
    subject,
    description,
    company
  );
  await mint.wait();
  console.log("Minting Done");
  return res.json({ message: "Minting Done" });
}
