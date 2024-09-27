import mongoose from "mongoose";
import validator from "validator";

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
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("email not valid: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value: string) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("password not strong enough: " + value);
        }
      },
    },
    gender: {
      type: String,
      enum: ["M", "F", "O"],
    },
    photoUrl: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png",
      validate(value: string) {
        if (!validator.isURL(value)) {
          throw new Error("not a valid photo url: " + value);
        }
      },
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
