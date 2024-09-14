const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();

const GROW_API_KEY = "grow_api_key";

app.use(express.json()); 
app.use(cors());

//! organization will secure this endpoint by there own way

app.post("/api/verifykyc", async (req, res) => {
    const { walletAddress } = req.body;

    if (!walletAddress) {
        return res.status(400).send("MetaMask address is required");
    }

    try {
        // Make a POST request to the /api endpoint with the wallet address
        const response = await axios.post("http://localhost:5000/api/org/verifyAndCheckUser", {
            walletAddress: walletAddress,
            grow_api_key: GROW_API_KEY,
        });

        // Return the response from /api endpoint to the original caller
        return res.json(response.data);
    } catch (error) {
        console.error("Error in making the request:", error);
        return res.status(500).send("Error occurred while verifying KYC");
    }
});



app.listen(3000, () => {
    console.log("Grow Backend is running on port 3000");
});