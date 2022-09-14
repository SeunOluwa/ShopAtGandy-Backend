import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";

export const newAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  verifyRefreshToken(refreshToken)
    .then(({ tokenDetails }) => {
      const payload = { id: tokenDetails.id };
      const accessToken = jwt.sign(
        payload,
        process.env.ACCESS_TOKEN_PRIVATE_KEY,
        { expiresIn: "1h" }
      );
      res.status(200).json({
        error: false,
        accessToken,
        message: "Access token created successfully",
      });
    })
    .catch((err) => res.status(400).json(err));
};
