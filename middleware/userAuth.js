import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const userAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access Denied" });

    const verifiedToken = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
    req.user = verifiedToken;

    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid/Expired Token" });
  }
};

export default userAuth;
