import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import dentistaRoutes from "./routes/dentistaRoutes";
import authRoutes from "./routes/authRoutes";
import administrativoRoutes from "./routes/administrativoRoutes";
import pacienteRoutes from "./routes/pacientesRoutes";
import consultaRoutes from "./routes/consultaRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

//Middlewares

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

//Routes

app.use("/api/dentistas", dentistaRoutes);
app.use("/api/administrativo", administrativoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/pacientes", pacienteRoutes);
app.use("/api/consultas", consultaRoutes);

//Connection

app.listen(PORT, () => {
  console.log("Connected to: ", PORT);
});
