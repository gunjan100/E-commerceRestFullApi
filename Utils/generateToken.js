const jwt = require("jsonwebtoken");

const genrateaccessToken = async (id) => {
  return jwt.sign({ id}, process.env.secretKey, { expiresIn: "10d" });
 
};

module.exports = {
  genrateaccessToken,
};
