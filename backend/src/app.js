import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());


// Test database connection
pool.query("SELECT NOW()")
  .then((result) => {
    console.log("Connected to PostgreSQL");
    console.log(result.rows[0]);
  })
  .catch((err) => {
    console.error("Database connection failed");
    console.error(err);
  });


app.get("/", (req, res) => {
res.send("Backend is running");
});

//port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});