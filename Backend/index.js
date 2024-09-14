import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userDashbordRoute from "./routes/userDashbordRoute.js";
import organizationDashbordRoute from "./routes/organizationDashbordRoute.js";
import govDashbordRoute from "./routes/govDashbordRoute.js";

import { checkOriginForUserDashdord } from "./middlewares/userDashbordMiddleware.js";
import { checkRequestFromGrow } from "./middlewares/organizationDashbordMiddeware.js";
import { checkOriginForGovDashboard } from "./middlewares/govDashbordMiddleWare.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

//! user dashbord api

app.use("/api/user", checkOriginForUserDashdord, userDashbordRoute);

app.use("/api/org", checkRequestFromGrow, organizationDashbordRoute);

app.use("/api/gov", checkOriginForGovDashboard, govDashbordRoute);

app.listen(5000, () => {
  console.log(`Main Backend is running on port 5000`);
});
