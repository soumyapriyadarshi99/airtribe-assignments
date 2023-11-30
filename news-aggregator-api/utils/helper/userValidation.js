const userData = require("../data/userData");
const bcrypt = require("bcrypt");

const isEmailPasswordMatchError = (email, password) => {
  const isUserFound = userData?.find((user) => user?.email === email);
  if (isUserFound) {
    const userPassword = isUserFound?.password;
    const isPasswordMatched = bcrypt.compareSync(password, userPassword);
    if (isPasswordMatched) {
      return false;
    } else {
      return true;
    }
  }
  return true;
};
module.exports = { isEmailPasswordMatchError };
