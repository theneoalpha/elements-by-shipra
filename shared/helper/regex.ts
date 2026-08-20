export const REGEX = {
  alphabeticName: {
    pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
    message: "Only letters and single spaces are allowed",
  },
  alphabeticNameWithHyphen: {
    pattern: /^[a-zA-Z-]+(?: [a-zA-Z-]+)*$/,
    message: "Only letters, hyphens, and single spaces are allowed",
  },
  alphanumericName: {
    pattern: /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/,
    message: "Only letters, numbers, and single spaces are allowed",
  },
  alphanumericNameWithHyphen: {
    pattern: /^[a-zA-Z0-9-]+(?: [a-zA-Z0-9-]+)*$/,
    message: "Only letters, numbers, hyphens, and single spaces are allowed",
  },
  mobileNumber: {
    pattern: /^[6-9]\d{9}$/,
    message: "Enter a valid 10-digit Indian mobile number",
  },
  email: {
    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Enter a valid email address",
  },
  cityName: {
    pattern: /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
    message: "Only letters and spaces are allowed in city name",
  },
};
