import express from "express";
import { verifyAndCheckUserFromOrganization } from "../controllers/organizationDashbordController.js";

const router = express.Router();

router.post("/verifyAndCheckUser", verifyAndCheckUserFromOrganization);

export default router;
