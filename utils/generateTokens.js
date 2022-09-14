import jwt from "jsonwebtoken";
import UserToken from "../models/userToken.js";

const generateTokens = async (user) => {
  try {
    const payload = { id: user._id };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    const userToken = await UserToken.findOne({ userId: user._id });
    if (userToken) await userToken.remove();

    await new UserToken({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(err);
  }
};

export default generateTokens;
