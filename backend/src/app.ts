import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes";
import todoRoutes from './routes/todoRoutes';
import listRoutes from './routes/listRoutes'

import { authenticate } from "./middlewares/authMiddleware";
import { getProfile } from "./controllers/userController";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", userRoutes);
app.use(authenticate);
app.get("/api/profile", getProfile);
app.use('/api', todoRoutes);
app.use('/api', listRoutes);


app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("[ERROR]", err?.message || err);
    res.status(500).json({ message: err?.message || "Erro inesperado no servidor." });
  },
);

export default app;
