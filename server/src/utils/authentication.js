import jwt from "jsonwebtoken";

const SECRET_KEY = "keyboard cat";

export const signToken = (payload) => {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "3d" });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};

export function requireAuth(resolver) {
  return async (parent, args, context, info) => {
    if (context.code === 401) {
      throw new Error("Unauthorized");
    }
    return resolver(parent, args, context, info);
  };
}
