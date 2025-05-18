import pool from "../config/db";

export interface ITodo {
  id?: number;
  userId?: number;
  title: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
  dueDate: Date;
  completed?: boolean;
}

class TodoModel {
  async createTodo(todo: ITodo) {
    const query = `
    INSERT INTO todos (user_id, title, description, created_at, updated_at, due_date, completed)
    VALUES ($1, $2, $3, NOW(), NULL, $4, false)
    RETURNING id, user_id, title, description, created_at, due_date, completed;`;

    const values = [todo.userId, todo.title, todo.description, todo.dueDate];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async updateTodo(todo: ITodo) {
    const query = `
     UPDATE todos
    SET title = $2, 
        description = $3, 
        updated_at = NOW(), 
        due_date = $4, 
        completed = $5
    WHERE id = $1
    RETURNING id, user_id, title, description, created_at, updated_at, due_date, completed;`;
    const values = [
      todo.id,
      todo.title,
      todo.description,
      todo.dueDate,
      todo.completed,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async deleteTodo(todoId: number) {
    const query = `DELETE FROM todos WHERE id = $1 RETURNING *;`;
    const values = [todoId];
    const result = await pool.query(query, values);
    // console.log(rows)

    return result.rows[0];
  }

  async findById(todoId: number) {
    const query = `SELECT * FROM todos where id = $1;`;
    const values = [todoId];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async getTodos(userId: number) {
    const query = `
      SELECT * FROM todos WHERE user_id = $1;`;

    const { rows } = await pool.query(query, [userId]);
    return rows;
  }
}

export default new TodoModel();
