const jwt = require("jsonwebtoken");
const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const { getUser } = require("../db.js");

const logIn = async (req = request, res = response) => {
  const { email, password } = req.body;
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //
  try {
    if (email.match(emailRegex) && password) {
      const [response] = await getUser({ email });
      const authenticated = await bcrypt.compare(password, response.password);

      if (authenticated) {
        try {
          // Crear Token
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 120,
              userId: response.id,
              isAdmin: response.is_admin,
            },
            process.env.SECRETKEY
          );

          response.is_admin
            ? res
                .cookie(process.env.SESSIONCOOKIE, token, {
                  maxAge: 120000,
                  secure: true,
                })
                .redirect("/admin")
            : res
                .cookie(process.env.SESSIONCOOKIE, token, {
                  maxAge: 120000,
                  secure: true,
                })
                .redirect("/dashboard");
          return;
        } catch (error) {
          console.log("generateJWT", error);
          return error;
        }
      }
    } else {
      res.status(403).render("login", {
        error: "Revisa tu correo electrónico o contraseña",
      });
    }
  } catch (error) {
    return res.status(500).render("login", {
      error: "Hable con el administrador.",
    });
  }
};

module.exports = {
  logIn,
};
