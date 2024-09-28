import validator from "validator";
import { Request } from "express";

export const validateSignUpData = (req: Request) => {
  const { firstName, lastName, userName, emailId, password } = req.body;
  if (!firstName || !lastName || !userName) {
    throw new Error("All fields are required");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Invalid emailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("password is not strong enough");
  }
};

