import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { ethers } from "ethers";
import axios from "axios";

export const Chart = () => {
  const data = [
    { name: 'Bitcoin', price: 40000, volume: 2400, amt: 2400 },
    { name: 'Ethereum', price: 3000, volume: 1398, amt: 2210 },
    { name: 'Litecoin', price: 2000, volume: 9800, amt: 2290 },
    { name: 'Bitcoin Cash', price: 2780, volume: 3908, amt: 2000 },
    { name: 'Cardano', price: 1890, volume: 4800, amt: 2181 },
    { name: 'Stellar', price: 2390, volume: 3800, amt: 2500 },
    { name: 'EOS', price: 3490, volume: 4300, amt: 2100 },
    { name: 'Monero', price: 4000, volume: 4500, amt: 2300 },
    { name: 'Dash', price: 2780, volume: 3900, amt: 2200 },
    { name: ' NEO', price: 1890, volume: 4800, amt: 2181 },
    { name: 'IOTA', price: 2390, volume: 3800, amt: 2500 },
    { name: 'TRON', price: 3490, volume: 4300, amt: 2100 },
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
          <span className="sr-only">Verifying KYC...</span>
        </div>
      </div>
    ) : (
      <div>
        <div className="flex justify-center mb-10">
          <h2 className="text-4xl font-bold text-white">Groww</h2>

        </div>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            style={{ textAlign: 'center' }}
          >
            <CartesianGrid stroke="#444" strokeDasharray="5 5" />
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip cursor={{ stroke: '#fff', strokeWidth: 2 }} />
            <Legend wrapperStyle={{ top: 0, left: 0, backgroundColor: '#333', padding: 10 }} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#ff7f0e"
              strokeWidth={2}
              dot={{ stroke: '#fff', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="volume"
              stroke="#1f77b4"
              strokeWidth={2}
              dot={{ stroke: '#fff', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>

        <button
          className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-6 rounded ml-[450px] mb-10"
          onClick={(e) => checkUserKyc(e)}
        >
          Connect
        </button>

        <div className="overflow-x-auto">
          <table className="table-auto w-full text-white">
            <thead className="bg-gray-800">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Ups/Downs</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="bg-gray-700 hover:bg-gray-600">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.price}</td>
                  <td className="px-4 py-2">{item.volume}</td>
                  <td className="px-4 py-2">
                    {item.price > item.volume ? (
                      <span className="text-green-500">Up</span>
                    ) : (
                      <span className="text-red-500">Down</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
  );
};

export default Chart;
