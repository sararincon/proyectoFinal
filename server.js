const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const moment = require("moment");

const {
  crearUsuario,
  getUsers,
  insertTodo,
  deleteUser,
  updateUser,
  editUser,
} = require("./db");

app.use(express.static("public"));
app.use(express.static("img"));

app.use("/static", express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "handlebars");
const hbs = exphbs.create({
  layoutsDir: __dirname + "/views",
  partialsDir: __dirname + "/views/components/",
});

app.engine("handlebars", hbs.engine);

app.use(
  fileUpload({
    limits: { fileSize: 5000000 },
    abortOnLimit: true,
    responseOnLimit:
      "El peso del arhivo que intentar subir supera el limite permitido",
  })
);

app.get("/", (req, res) => {
  res.render("main", { layout: "welcome" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("registro");
});

// --------------------------------ADMIN---------------------------
app.get("/admin", async (req, res) => {
  const { id } = req.query;
  const response = await getUsers(+id);
  const formattedResponse = response.map((todo) => {
    const formattedDate = moment(todo.fecha_registro).format("LLL");
    return {
      ...todo,
      formattedDate,
    };
  });
  res.render("userManagement", { formattedResponse });
});

app.post("/registro", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;

    const { foto } = req.files;
    const foto2 = foto.name;

    foto.mv(__dirname + "/img/" + foto2);

    await crearUsuario({ name, lastname, email, password, foto2 });
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(+id);
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email } = req.body;
    const { foto } = req.files;
    const foto2 = foto.name;
    await updateUser({ id, name, lastname, email, foto2 });
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const response = await editUser(+id);
    res.render("editUser", { response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
