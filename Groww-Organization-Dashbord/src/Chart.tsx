import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { ethers } from "ethers";
import axios from "axios";

export const Chart = () => {
  const dataUp = [
    { name: "Jan", value: 0 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 60 },
    { name: "May", value: 80 },
  ];

  const dataDown = [
    { name: "Jan", value: 80 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 40 },
    { name: "Apr", value: 20 },
    { name: "May", value: 0 },
  ];

  const dataFluctuating1 = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 60 },
    { name: "Mar", value: 20 },
    { name: "Apr", value: 80 },
    { name: "May", value: 40 },
  ];

  const dataFluctuating2 = [
    { name: "Jan", value: 60 },
    { name: "Feb", value: 20 },
    { name: "Mar", value: 80 },
    { name: "Apr", value: 40 },
    { name: "May", value: 60 },
  ];

  const [account, setAccount] = useState("");
  const [userAuthorized, setUserAuthorized] = useState(false);

  const [loading, setLoading] = useState(false);

  // Function to connect to MetaMask
  const checkUserKyc = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    // @ts-ignore
    if (window.ethereum) {
      try {
        // Request account access
        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected account:", accounts[0]);

        // Initialize ethers provider
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider:", provider);

        const signer = await provider.getSigner();
        const accountAddress = await signer.getAddress();
        setAccount(accountAddress);

        const response = await axios.post(
          "http://localhost:3000/api/verifykyc",
          {
            walletAddress: accountAddress,
          }
        );
 
        if (response.data.isAuthorized == true) {
          setUserAuthorized(response.data.isAuthorized);
          alert("User is authorized");
        } else {
          setUserAuthorized(false);
          alert("User is not authorized");
        }
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.log("MetaMask is not installed");
    }

    setLoading(false);

  };

  return (
    <div className="max-w-screen-lg mx-auto  p-5 mt-10 mb-10">
      {loading ? (
        // add lodder
        <div className="h-screen w-screen absolute top-0 left-0 bg-black flex items-center justify-center">
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-white">Groww</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-5 rounded shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Up Trend</h3>
              <LineChart width={400} height={200} data={dataUp}>
                <Line type="monotone" dataKey="value" stroke="#2ecc71" />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </div>
            <div className="bg-white p-5 rounded shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Down Trend
              </h3>
              <LineChart width={400} height={200} data={dataDown}>
                <Line type="monotone" dataKey="value" stroke="#e74c3c" />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white p-5 rounded shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Fluctuating Trend 1
              </h3>
              <LineChart width={400} height={200} data={dataFluctuating1}>
                <Line type="monotone" dataKey="value" stroke="#9b59b6" />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </div>
            <div className="bg-white p-5 rounded shadow-md">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Fluctuating Trend 2
              </h3>
              <LineChart width={400} height={200} data={dataFluctuating2}>
                <Line type="monotone" dataKey="value" stroke="#f1c40f" />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </div>
          </div>

          <div className="text-center">
            <button
              className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-6 rounded"
              onClick={(e) => checkUserKyc(e)}
            >
              Connect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
