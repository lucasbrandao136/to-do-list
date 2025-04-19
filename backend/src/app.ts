import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// Importação de rotas (depois criamos elas)
// import userRoutes from './routes/userRoutes';
// import todoRoutes from './routes/todoRoutes';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
// app.use('/api/users', userRoutes);
// app.use('/api/todos', todoRoutes);

export default app;
