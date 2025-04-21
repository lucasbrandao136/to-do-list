import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import userRoutes from "./routes/userRoutes";
import todoRoutes from './routes/todoRoutes';

import { authenticate } from "./middlewares/authMiddleware";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", userRoutes);
app.use(authenticate); 
app.use('/api', todoRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err); 
    res.status(500).json({ message: "Erro inesperado no servidor." });
  },
);

export default app;
