const userData = require("../data/userData");
const isEmailValid = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const isEmailAlreadyExist = (email) => {
  return userData?.find((item) => item?.email === email);
};
module.exports = { isEmailValid, isEmailAlreadyExist };
