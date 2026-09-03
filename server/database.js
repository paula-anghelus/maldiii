import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("Conectarea la PostgreSQL este configurată!");

export default pool;