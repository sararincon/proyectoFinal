require("dotenv").config();
const { Pool } = require("pg");
const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(config);

const getTodos = async () => {
  let query = "SELECT * FROM todos";
  const res = await pool.query(query);
  return res.rows;
};
getTodos()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// const getDate = async () => {
//   const result = await pool.query("SELECT NOW()");
//   console.log(result);
// };
// getDate();
