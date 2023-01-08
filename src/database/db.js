import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;

export let connection;

try {
  connection = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "rainbow123",
    database: "linkrteste",
  });

  /*
  connection = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });*/
} catch (err) {
  console.log("Erro ao conectar no banco de dados: ", err);
}
