import mongoose, { Document, Model } from "mongoose";
import { IUser } from "./User";
export interface Irequest extends Document {
  toUserId: mongoose.Schema.Types.ObjectId  | IUser
  fromUserId: mongoose.Schema.Types.ObjectId | IUser
  status: "interested" | "uninterested" | "accepted" | "rejected";
}

const connectionRequestSchema = new mongoose.Schema(
  {
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested", "uninterested", "accepted", "rejected"],
        message: "{VALUE} is not supported",
      },
    },
  },
  { timestamps: true }
);
connectionRequestSchema.index({ toUserId: 1, fromUserId: 1 });
connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  // check case for sending request you to yourself
  if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
    throw new Error("You can't send a request to yourself");
  }
  next();
});

const connectionRequestModel: Model<Irequest> = mongoose.model<Irequest>(
  "ConnectionRequest",
  connectionRequestSchema
);
export default connectionRequestModel;
