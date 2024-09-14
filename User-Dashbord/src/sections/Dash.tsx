import { useEffect, useState } from "react";
import { HeaderSection } from "./Header";
import data from "./data.json";
import axios from "axios";
import { ethers } from "ethers";

export const Dash = () => {
  const [account, setAccount] = useState("");
  const [userData, setUserData] = useState<any>({});

  // Function to connect to MetaMask
  const connectWallet = async () => {
    let walletAddress = "";
    //@ts-ignore
    if (window.ethereum) {
      try {
        // Request account access
        //@ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);

        // Initialize ethers provider
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider:", provider);

        const signer = provider.getSigner();
        const accountAddress = await signer.getAddress();
        console.log("accountAddress : ", accountAddress);
        setAccount(accountAddress);
        walletAddress = accountAddress;
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("MetaMask is not installed");
    }

    if (walletAddress) {
      console.log("account : ", walletAddress);
      try {
        // Fetch nonce from the backend
        const { data: nonce } = await axios.post(
          "http://localhost:5000/api/user/getNonce",
          {
            address: walletAddress,
          }
        );

        // // Create a message to sign
        const message = `I am signing my one-time nonce: ${nonce}`;
        // console.log(message)

        // Initialize ethers provider and signer
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        console.log(signature);
        console.log(account);
        console.log(message);

        // Send the signed message to the backend for verification
        const response = await axios.post(
          "http://localhost:5000/api/user/verifyAndGetUserData",
          {
            address: walletAddress,
            signature,
          }
        );

        // Update the state with the returned user data
        setUserData(response.data);
        console.log("responce : ", response.data);
      } catch (error) {
        console.error("Error signing message:", error);
      }
    }
  };

  async function setUp() {
    await connectWallet();
  }

  useEffect(() => {
    setUp();
  }, []);

  return (
    <>
      <HeaderSection />
     
        <div className="overflow-clip">
          <div className="flex justify-center">
            {userData && (
              <div className="bg-zinc-800 text-white p-4 rounded-xl mt-9 mb-4 shadow-md ">
                <div className="flex justify-between mb-4 ">
                  <h2 className="text-4xl font-bold">{userData.name}</h2>
                  <div className="text-3xl font-medium">{userData.dob}</div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="text-2xl font-medium">Aadhar ID:</div>
                  <div className="text-2xl font-medium">{userData.adharId}</div>
                </div>
                <div className="flex justify-between mb-4">
                  <div className="text-2xl font-medium mr-5">
                    Wallet Address:
                  </div>
                  <div className="text-2xl font-medium">
                    {userData.walletAddress}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
     
    </>
  );
};

export default Dash;
