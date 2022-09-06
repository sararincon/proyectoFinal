const { request, response } = require("express");

const logOut = (req = request, res = response) => {
  res.clearCookie(process.env.SESSIONCOOKIE);
  res.redirect("/");
};

module.exports = {
  logOut,
};
