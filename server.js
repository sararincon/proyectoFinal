const express = require("express");
const path = require("path");
const fileUpload = require("express-fileupload");
const exphbs = require("express-handlebars");
const app = express();
const port = process.env.PORT || 3000;
const moment = require("moment");
const cookieParser = require("cookie-parser");

const {
  getUsers,
  insertTodo,
  deleteUser,
  updateUser,
  editUser,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("./db");

const { logIn } = require("./controllers/login.controller.js");
const { logOut } = require("./controllers/logout.controller");
const { userRegister } = require("./controllers/register.controller");
const { validateJWT, getJWT } = require("./helpers/validate-jwt");

//Para poder trabajar con las cookies
app.use(cookieParser());

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

//login

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", logIn, validateJWT);

// Register
app.get("/registro", (req, res) => {
  res.render("registro");
});

app.post("/registro", userRegister);

// --------------------------------ADMIN---------------------------

app.get("/admin", validateJWT, async (req, res) => {
  const response = await getUsers();
  const formattedResponse = response.map((todo) => {
    const formattedDate = moment(todo.fecha_registro).format("LLL");
    return {
      ...todo,
      formattedDate,
    };
  });

  res.render("userManagement", { formattedResponse });
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
    const { name, lastname, email, password } = req.body;

    await updateUser({ id, name, lastname, email, password });
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

// -------------TASKS----------------

// Dashboard

app.get("/dashboard", validateJWT, async (req, res) => {
  const { userId } = await getJWT(req);
  const response = await getTodos({ userId });
  const formattedResponse = response.map((todo) => {
    const formattedDate = moment(todo.fecha).format("LLL");
    return {
      ...todo,
      formattedDate,
    };
  });
  res.render("dashboard", { formattedResponse });
});
//Post de Tarea
app.post("/dashboard", validateJWT, async (req, res) => {
  const { userId } = await getJWT(req);
  const { todo } = req.body;
  const { status } = req.body;

  await insertTodo({ userId, todo, status });
  res.redirect("/dashboard");
});
//Elimina una tarea
app.get("/dashboard/delete/:id", validateJWT, async (req, res) => {
  const { id } = req.params;
  await deleteTodo(id);
  res.redirect("/dashboard");
});
//Editando Tareas
app.put("/dashboard/edit", validateJWT, async (req, res) => {
  const { id, task } = req.body;
  // const date = moment().format("YYYY MM DD, h:mm:ss a");
  await updateTodo(id, task);
  res.status(200).end();
});

//logOut
app.get("/logout", logOut);

app.listen(port, () => {
  console.log("Listening on port " + port);
});
