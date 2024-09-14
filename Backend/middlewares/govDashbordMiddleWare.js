import { GOV_DASHBOARD_FRONTEND_SITE, JWT_SECREAT } from "../config.js";
import jwt from "jsonwebtoken";

export function checkOriginForGovDashboard(req, res, next) {
  const allowedOrigin = GOV_DASHBOARD_FRONTEND_SITE; // Remove trailing slash

  const origin = req.get("Origin") || req.get("Referer");

  if (origin && origin.startsWith(allowedOrigin)) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied from this origin" });
  }
}

export function checkToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECREAT);
        req.user = decoded;
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
      }
    } else {
      res.status(401).json({ message: "Invalid token" });
    }
  } else {
    res.status(403).json({ message: "Access denied" });
  }
}
