import mongoose, { Document, Model } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Define the interface for the User document, including custom methods
export interface IUser extends Document {
  firstName: string;
  lastName?: string;
  userName: string;
  age?: number;
  emailId: string;
  password: string;
  gender?: "M" | "F" | "O";
  photoUrl: string;
  about?: string;
  skills: string[];
  getJWT: () => string;
  validatePassword: (passwordInputByUser: string) => Promise<boolean>;
}

// Define the User schema
const userSchema = new mongoose.Schema<IUser>(
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
          throw new Error("Email not valid: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate(value: string) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Password not strong enough: " + value);
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
          throw new Error("Not a valid photo URL: " + value);
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

// Custom method to generate JWT
userSchema.methods.getJWT = function () {
  const user = this as IUser;
  const token = jwt.sign({ _id: user._id },"Piyush@123", {
    expiresIn: "1d",
  });
  return token;
};

// Custom method to validate the password
userSchema.methods.validatePassword = async function (passwordInputByUser: string) {
  const user = this as IUser;
  return await bcrypt.compare(passwordInputByUser, user.password);
};

// Export the User model 
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
