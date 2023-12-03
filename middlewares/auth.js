import jwt from "jsonwebtoken";
import { RocUsers } from "../models/user.model.js";

export function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    return decoded;
  } catch (error) {
    console.log(error);
    res.status(403).json({ message: "access denined" });
  }
}

export function extractUserFromToken(decoded) {
  if (decoded && decoded._id) {
    return decoded._id;
  } else {
    throw new Error("Invalid or missing user ID in token");
  }
}

const verifyUserAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decoded = verifyToken(token);
    const userId = extractUserFromToken(decoded);
    req.user = await RocUsers.findById(userId);
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorised access, please add the token" });
  }
};

export { verifyUserAuth };
