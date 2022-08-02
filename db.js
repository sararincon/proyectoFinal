const { Pool } = require("pg");
const config = {
  user: "sararincon",
  host: "localhost",
  database: "todo",
  password: "123456",
  port: 5432,
};
const pool = new Pool(config);

const getDate = async () => {
  const result = await pool.query("SELECT NOW()");
  console.log(result);
};
getDate();
