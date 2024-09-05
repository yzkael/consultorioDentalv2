import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  port: 5432,
  database: "consultorio_dentalv2",
});

export default pool;
