import {
  isValidString,
  isValidEmail,
  isValidPassword,
  isValidDate,
} from "@/utils/validators";
import { type IUser } from "@/interfaces/User";

export const validateNewUser = (userData: IUser) => {
  const { email, password, fullName, displayName, photoFile, birthday } =
    userData;

  const errors = [];

  if (!isValidEmail(email)) {
    errors.push("invalidEmail");
  }
  if (!isValidString(email)) {
    errors.push("email");
  }
  if (!isValidPassword(password)) {
    errors.push("password");
  }
  if (!isValidString(fullName)) {
    errors.push("fullName");
  }
  if (!isValidString(displayName)) {
    errors.push("displayName");
  }
  if (!isValidDate(birthday)) {
    errors.push("birthday");
  }

  return {
    errors,
  };
};

export const validateUserLogin = (email: string, password: string) => {
  const errors = [];

  if (!isValidString(email)) {
    errors.push("email");
  }
  if (!isValidEmail(email)) {
    errors.push("invalidEmail");
  }
  if (!isValidPassword(password)) {
    errors.push("password");
  }

  return errors;
};
