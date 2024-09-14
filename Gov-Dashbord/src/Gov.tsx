import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie



const Gov: React.FC = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [aadharId, setAadharId] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [nameError, setNameError] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [aadharIdError, setAadharIdError] = useState(false);
  const [walletAddressError, setWalletAddressError] = useState(false);

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



  const onSubmit = async (e:any) => {
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          Indian Flag Themed Form
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`text-black w-full p-2 border rounded ${nameError ? "border-red-500" : "border-gray-300"}`}
              type="text"
            />
            {nameError && (
              <p className="text-red-500 text-xs italic">Name is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`text-black w-full p-2 border rounded ${dobError ? "border-red-500" : "border-gray-300"}`}
              type="date"
            />
            {dobError && (
              <p className="text-red-500 text-xs italic">
                Date of Birth is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Aadhar ID Number</label>
            <input
              value={aadharId}
              onChange={(e) => setAadharId(e.target.value)}
              className={`text-black w-full p-2 border rounded ${aadharIdError ? "border-red-500" : "border-gray-300"}`}
              type="text"
            />
            {aadharIdError && (
              <p className="text-red-500 text-xs italic">
                Aadhar ID is required
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Wallet Address</label>
            <input
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className={`text-black w-full p-2 border rounded ${walletAddressError ? "border-red-500" : "border-gray-300"}`}
              type="text"
            />
            {walletAddressError && (
              <p className="text-red-500 text-xs italic">
                Wallet Address is required
              </p>
            )}
          </div>

          <button
            onClick={onSubmit}
            className="w-full mt-4 p-2 bg-green-600 text-white rounded hover:bg-orange-500"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gov;
