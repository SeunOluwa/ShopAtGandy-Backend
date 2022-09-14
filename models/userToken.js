import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const userTokenSchema = mongoose.Schema({
  userId: {
    type: ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 * 86400, // 30 days
  },
});

const UserToken = mongoose.model("UserToken", userTokenSchema);

export default UserToken;
