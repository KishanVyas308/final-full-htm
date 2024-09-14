import express from "express";
import { getNonce, verifyAndGetUserData } from "../controllers/userDashbordController.js";

const router = express.Router();

router.post("/getNonce", getNonce);

router.post("/verifyAndGetUserData", verifyAndGetUserData);

export default router;
