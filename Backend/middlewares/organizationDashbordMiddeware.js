import { GROW_API_KEY } from "../config.js";

//? grow check api
export function checkRequestFromGrow(req, res, next) {
  const { grow_api_key } = req.body;
  if (grow_api_key && grow_api_key === GROW_API_KEY) {
    next();
  } else {
    res.status(403).json({ message: "Invalid GROW_API_KEY" });
  }
}

