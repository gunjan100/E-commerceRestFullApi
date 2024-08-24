const jwt = require("jsonwebtoken");

const genrateaccessToken = async (id) => {
  return jwt.sign({ id ,email}, process.env.secretKey, { expiresIn: "1h" });
 
};

module.exports = {
  genrateaccessToken,
};
