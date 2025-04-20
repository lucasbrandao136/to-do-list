import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// Importação de rotas (depois criamos elas)
import userRoutes from "./routes/userRoutes";
// import todoRoutes from './routes/todoRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api", userRoutes);
// app.use('/api/todos', todoRoutes);

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err); // Log do erro completo
    res.status(500).json({ message: "Erro inesperado no servidor." });
  },
);

export default app;
