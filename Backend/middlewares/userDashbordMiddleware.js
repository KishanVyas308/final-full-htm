import { USER_DASHBOARD_FRONTEND_SITE } from "../config.js";

export function checkOriginForUserDashdord(req, res, next) {
  const allowedOrigin = USER_DASHBOARD_FRONTEND_SITE;

  const origin = req.get("Origin") || req.get("Referer");

  if (origin && origin.startsWith(allowedOrigin)) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied from this origin" });
  }
}
