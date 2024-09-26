import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      maxLength: 50,
    },
    age: {
      type: Number,
      min: 14,
      max: 100,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    photoUrl: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
    },
    about: {
      type: String,
      minLength: 70,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
