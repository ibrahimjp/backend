import dotenv from "dotenv";
dotenv.config({path: "./.env"});
import express from "express";
import { connectDB } from "./src/db/index.js";

const app = express();

connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});