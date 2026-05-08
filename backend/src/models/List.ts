import pool from "../config/db";

interface ListData {
  id: number;
  userId: number;
  name: string;
  color: string;
  is_archived: boolean;
}

class List {
  async getLists(userId: number) {
    const query = `
      SELECT 
        lists.*, 
        COALESCE(json_agg(
          json_build_object(
            'id', todos.id,
            'title', todos.title,
            'description', todos.description,
            'completed', todos.completed,
            'created_at', todos.created_at,
            'due_date', todos.due_date,
            'list_id', todos.list_id
          )
        ) FILTER (WHERE todos.id IS NOT NULL), '[]') AS todos
      FROM lists
      LEFT JOIN todos ON todos.list_id = lists.id
      WHERE lists.user_id = $1 AND lists.is_archived = false
      GROUP BY lists.id;
    `;
    const { rows } = await pool.query(query, [userId]);
    return rows;
  }

  async createList(userId: number, name: string, color: string) {
    const query = `
      INSERT INTO lists (user_id, name, color, is_archived)
      VALUES ($1, $2, $3, false)
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [userId, name, color]);
    return rows[0];
  }

  async updateList(id: number, name: string, color: string) {
    const query = `
      UPDATE lists
      SET name = $1, color = $2
      WHERE id = $3
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [name, color, id]);
    return rows[0];
  }

  async deleteList(id: number) {
    const query = `
      DELETE FROM lists
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  async setArchived(id: number, status: boolean) {
    const query = `
      UPDATE lists
      SET is_archived = $2
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id, status]);
    return rows[0];
  }

  async dearchiveList(id: number) {
    const query = `
      UPDATE lists
      SET is_archived = false
      WHERE id = $1
      RETURNING *;
    `;
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }


  async getArchivedLists(userId: number) {
  const query = `SELECT * FROM lists WHERE user_id = $1 AND is_archived = true;`;
  const { rows } = await pool.query(query, [userId]);
  return rows;
}

}



export default new List();
