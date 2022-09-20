require("dotenv").config();
const { Pool } = require("pg");
const moment = require("moment");

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(config);

const date = moment().format("MMM Do YY");

const crearUsuario = async ({ name, lastname, email, password, fotoName }) => {
  const dbQuery =
    "INSERT INTO users (name, lastname, email, password, foto, is_admin) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";

  try {
    const counter = await pool.query("SELECT COUNT(*) AS count FROM users");
    const [{ count }] = counter.rows;
    let isAdmin = false;
    if (Number(count) === 0) {
      isAdmin = true;
    }
    const values = [name, lastname, email, password, fotoName, isAdmin];
    const result = await pool.query(dbQuery, values);
    return result.rows;
  } catch (error) {
    throw error;
  }
};

const getUsers = async (id) => {
  const dbQuery = {
    text: "SELECT * FROM users ORDER BY $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

const getUser = async ({ email, password }) => {
  const dbQuery = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };
  try {
    const result = await pool.query(dbQuery);
    return result.rows;
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (id) => {
  const dbQuery = {
    text: "DELETE FROM users WHERE id = $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);

  return result;
};
const updateUser = async ({ id, name, lastname, email }) => {
  const dbQuery = {
    text: "UPDATE users SET name = $1, lastname = $2, email = $3  WHERE id = $4 ",
    values: [name, lastname, email, id],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

const editUser = async (id) => {
  const dbQuery = {
    text: "SELECT * FROM users WHERE id = $1",
    values: [id],
  };
  try {
    const result = await pool.query(dbQuery);
    console.log("editado", result.rows);
    return result.rows;
  } catch (error) {
    console.log(error);
  }
};

// ---TASKS---
const insertTodo = async ({ userId, todo }) => {
  const dbQuery = {
    text: "INSERT INTO tasks (user_id, task_name) VALUES ($1, $2) RETURNING *;",
    values: [userId, todo],
  };
  const result = await pool.query(dbQuery);
  return result.rows[0];
};

const getTodos = async ({ userId }) => {
  const dbQuery = {
    text: "SELECT * FROM tasks WHERE user_id = $1",
    values: [userId],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

const updateTodo = async (id, todo) => {
  const dbQuery = {
    text: "UPDATE tasks SET task_name = $1  WHERE id = $2 RETURNING*",
    values: [todo, id],
  };
  const result = await pool.query(dbQuery);
  return result.rows[0];
};

const deleteTodo = async (id) => {
  const dbQuery = {
    text: "DELETE FROM tasks WHERE id = $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);
  return result.rowCount;
};

module.exports = {
  crearUsuario,
  getUsers,
  deleteUser,
  updateUser,
  editUser,
  insertTodo,
  getTodos,
  getUser,
  deleteTodo,
  updateTodo,
};
