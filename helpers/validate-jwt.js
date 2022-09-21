const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJWT = async (req = request, res = response, next) => {
  if (!req.cookies[process.env.SESSIONCOOKIE]) {
    res.redirect("/login");
    return;
  }

  const cookie = req.cookies[process.env.SESSIONCOOKIE];
  try {
    const token = await jwt.verify(cookie, process.env.SECRETKEY);
    req.userId = token.userId;
    req.isAdmin = token.isAdmin;
  } catch (error) {
    res.redirect("/login");
    return error;
  }
  next();
};

const getJWT = async (req, res) => {
  const cookie = req.cookies[process.env.SESSIONCOOKIE];

  // console.log("COOKIE", cookie);
  const token = await jwt.verify(cookie, process.env.SECRETKEY);

  // console.log("TOKEEN", token);
  return token;
};

module.exports = {
  validateJWT,
  getJWT,
};
