import pool from "../config/db";

export interface IUser {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  displayName: string;
  birthday: Date;
  registeredAt?: Date;
  enabledAt?: boolean;
}

class UserModel {
  async createUser(user: IUser) {
    const query = `
    INSERT INTO users (email, password, full_name, display_name,  birthday, registered_at, enabled_at)
    VALUES ($1, $2, $3, $4, $5, NOW(), true)
    RETURNING id, email, full_name, display_name, birthday, registered_at, enabled_at;
    `;

    const values = [
      user.email,
      user.password,
      user.fullName,
      user.displayName,
      user.birthday,
      
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async findByEmail(email: string) {
    const query = `
      SELECT * FROM users WHERE email = $1;`;

    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  async findById(id: number) {
    const query = `
      SELECT id, email, full_name, display_name, birthday, registered_at, enabled_at
      FROM users WHERE id = $1;`;

    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

export default new UserModel();
