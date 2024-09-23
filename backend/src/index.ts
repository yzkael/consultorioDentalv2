import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import dentistaRoutes from "./routes/dentistaRoutes";
import authRoutes from "./routes/authRoutes";
import administrativoRoutes from "./routes/administrativoRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//Routes

app.use("/api/dentistas", dentistaRoutes);
app.use("/api/administrativo", administrativoRoutes);
app.use("/api/auth", authRoutes);

//Connection

app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
