const { crearUsuario } = require("../db.js");
const bcrypt = require("bcryptjs");

const userRegister = async (req, res) => {
  const { name, lastname, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);

  let fotoName = "default.jpeg";
  if (req.files) {
    const { foto } = req.files;
    fotoName = foto.name;
    foto.mv(`${__dirname}/../img/${fotoName}`);
  }

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  try {
    if (email.match(emailRegex) && password) {
      await crearUsuario({
        name,
        lastname,
        email,
        password: hash,
        fotoName,
      });

      res.status(200).render("registro", {
        message: "Usuario creado con éxito. Ya puedes iniciar sesión.",
      });
      return;
    } else {
      let messageError = null;

      if (!email.match(emailRegex)) {
        messageError = "Email invalido. Por favor ingrese un email correcto.";
      }

      if (!password) {
        messageError = "Debes escribir una contraseña.";
      }

      res.status(400).render("registro", {
        error: messageError,
      });
    }
  } catch (error) {
    let status = 500;
    let messageError = "Ha ocurrido un error, contacta al administrador.";

    const { constraint } = error;

    if (constraint === "users_email_key") {
      status = 409;
      messageError = "El email ya se encuentra registrado. Intenta con otro";
    }

    res.status(status).render("registro", {
      error: messageError,
    });
  }
};

module.exports = {
  userRegister,
};
