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

const ALLOWED_UPDATES = [
  "firstName",
  "lastName",
  "userName",
  "age",
  "gender",
  "photoUrl",
  "about",
  "skills",
];
export const validateEditProfileData = (req: Request) => {

  const isUpdateAllowed = Object.keys(req.body).every((field) =>
    ALLOWED_UPDATES.includes(field)
  );
  return isUpdateAllowed;
};
