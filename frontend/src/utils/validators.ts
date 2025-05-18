export const isValidString = (value: string, minLength = 1) => {
  return (
    typeof value === "string" &&
    value &&
    value.trim() !== "" &&
    value.trim().length >= minLength
  );
};

export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

export const isValidPassword = (password: string, minLength = 8) => {
  return isValidString(password, minLength);
};

export const isValidDate = (date: string) => {
  const dateObj = new Date(date);
  if (isNaN(dateObj.getTime())) return false;

  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

  return dateObj <= tenYearsAgo;
};
