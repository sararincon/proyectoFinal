const { request, response } = require("express");
const { crearUsuario } = require("../db.js");

const userRegister = async (req = request, res = response) => {
  try {
    const { name, lastname, email, password } = req.body;

    const { foto } = req.files;
    const foto2 = foto.name;

    foto.mv(__dirname + "./img/" + foto2);

    await crearUsuario({ name, lastname, email, password, foto2 });
    res.redirect("/login");
  } catch (err) {
    console.log(err);

    res
      .status(500)
      .json({ error: "Ha ocurrido un error, contacta al administrador." });
  }
};
//   try {
//     const { name, lastname, email, password } = req.body;
//     const { foto } = req.files;
//     const foto2 = foto.name;

//     foto.mv(__dirname + "./img" + foto2);

//     const response = await crearUsuario({
//       name,
//       lastname,
//       email,
//       password,
//       foto2,
//     });
//     if (!response.severity) {
//       res.status(200).render("login", {
//         message: "Usuario creado con éxito.",
//       });
//       return;
//     }
//   } catch (error) {
//     const errorMessages = {
//       users_email_key: "El correo electrónico ya fue utilizado",
//     };
//     res.status(409).render("registro", {
//       error: `${errorMessages[response.constraint]}.`,
//     });
//     res.status(500).render("registro", {
//       message: "Ha ocurrido un error, contacta al administrador.",
//     });
//   }
// };

module.exports = {
  userRegister,
};
