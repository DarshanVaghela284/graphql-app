import { verifyToken } from "./authentication.js";

export function authContext(req) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.replace("Bearer ", "");

  if (token) {
    try {
      verifyToken(token);
      return { code: 200, message: "Authorized" };
    } catch (err) {
      console.error("Auth error:", err.message);
    }
  }
  return { code: 401, message: "Unauthorized" };
}
