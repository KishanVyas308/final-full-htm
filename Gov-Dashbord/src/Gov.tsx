import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import clsx from 'clsx'
import { Link, useNavigate } from "react-router-dom";


const className = 'my-custom-class';
const Gov: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [aadharId, setAadharId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [nameError, setNameError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [aadharIdError, setAadharIdError] = useState(false);
  const [walletAddressError, setWalletAddressError] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    setNameError(false);
    setDobError(false);
    setAadharIdError(false);
    setWalletAddressError(false);

    if (!name) {
      setNameError(true);
    }

    if (!dob) {
      setDobError(true);
    }

    if (!aadharId) {
      setAadharIdError(true);
    }

    if (!walletAddress) {
      setWalletAddressError(true);
    }
  };



  const onSubmit = async (e: any) => {
    e.preventDefault();
    validateForm();
    const token = Cookies.get("authToken");

    console.log(name, dob, aadharId, walletAddress);


    try {
      const response = await fetch("http://localhost:5000/api/gov/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({
          name: name,
          dob: dob,
          adharId: aadharId,
          address: walletAddress,
        }),
      });

      const result = await response.json();
      console.log(result.message); // Handle success or failure message
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="absolute top-0 left-0 w-full h-full overflow-clip">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 82 72"
          fill="none"
          stroke="currentColor"
          stroke-width="6"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx("text-fuchsia-500/10 -rotate-6", className)}
        >
          <path
            d="M3.44337 38.5C2.55021 36.953 2.55021 35.047 3.44338 33.5L20.0566 4.72501C20.9498 3.178 22.6004 2.22501 24.3868 2.22501H57.6132C59.3996 2.22501 61.0502 3.178 61.9434 4.72501L78.5566 33.5C79.4498 35.047 79.4498 36.953 78.5566 38.5L61.9434 67.275C61.0502 68.822 59.3996 69.775 57.6132 69.775H24.3867C22.6004 69.775 20.9498 68.822 20.0566 67.275L3.44337 38.5Z"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="w-full max-w-md p-6 bg-zinc-700 rounded-lg shadow-md z-50">
        <h2 className="text-3xl font-bold text-center text-fuchsia-500 mb-6">
          Registration Form
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-white text-lg">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`text-black w-full p-3 pl-10 border rounded ${nameError ? "border-red-500" : "border-zinc-500"}`}
              type="text"
              placeholder="Enter your name"
            />
            {nameError && (
              <p className="text-red-500 text-xs italic">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-white text-lg">Date of Birth</label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`text-black w-full p-3 pl-10 border rounded ${dobError ? "border-red-500" : "border-zinc-500"}`}
              type="date"
            />
            {dobError && (
              <p className="text-red-500 text-xs italic">
                Date of Birth is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-white text-lg">Aadhar ID Number</label>
            <input
              value={aadharId}
              onChange={(e) => setAadharId(e.target.value)}
              className={`text-black w-full p-3 pl-10 border rounded ${aadharIdError ? "border-red-500" : "border-zinc-500"}`}
              type="text"
              placeholder="Enter your Aadhar ID"
            />
            {aadharIdError && (
              <p className="text-red-500 text-xs italic">
                Aadhar ID is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-white text-lg">Wallet Address</label>
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={`text-black w-full p-3 pl-10 border rounded ${walletAddressError ? "border-red-500" : "border-zinc-500"}`}
              type="text"
              placeholder="Enter your wallet address"
            />
            {walletAddressError && (
              <p className="text-red-500 text-xs italic">
                Wallet Address is required
              </p>
            )}
          </div>

          <button
            onClick={onSubmit}
            className="w-full mt-6 p-3 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-600"
          >
            Submit
          </button>
          <Link to={"/report"}><p className="text-fuchsia-500 text-center mt-4">Report A User ?</p></Link>

        </div>
      </div>
    </div>
  );
};

export default Gov;
