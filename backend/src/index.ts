import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes

//Connection

app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
