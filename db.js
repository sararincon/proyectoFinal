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

const crearUsuario = async ({ name, lastname, email, password, foto2 }) => {
  const dbQuery = {
    text: "INSERT INTO users (name, lastname, email, password, foto) VALUES($1, $2, $3, $4, $5) RETURNING *",
    values: [name, lastname, email, password, foto2],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

const getUsers = async (id) => {
  const dbQuery = {
    text: "SELECT * FROM users ORDER BY $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

const deleteUser = async (id) => {
  const dbQuery = {
    text: "DELETE FROM users WHERE id = $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);
  // console.log("eliminado", result);
  return result;

  // return result.rows;
};
const updateUser = async ({ id, name, lastname, email, foto2 }) => {
  const dbQuery = {
    text: "UPDATE users SET name = $1, lastname = $2, email = $3, foto= $4 WHERE id = $5 ",
    values: [name, lastname, email, foto2, id],
  };
  const result = await pool.query(dbQuery);
  return result.rows;
};

const editUser = async (id) => {
  const dbQuery = {
    text: "SELECT * FROM users WHERE id = $1",
    values: [id],
  };
  const result = await pool.query(dbQuery);
  console.log("editado", result.rows);
  return result.rows;
};

// const insertTodo = async ({ todo }) => {
//   const dbQuery = {
//     text: "INSERT INTO tasks ( task_name) VALUES ( $1) RETURNING *;",
//     values: [todo],
//   };
//   const result = await pool.query(dbQuery);
//   return result.rows;
// };

module.exports = {
  crearUsuario,
  getUsers,
  deleteUser,
  updateUser,
  editUser,
  // insertTodo,
};
