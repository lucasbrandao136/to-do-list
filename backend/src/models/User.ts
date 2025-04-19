import pool from "../config/db";

export interface IUser {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  displayName: string;
  birthday: Date;
  photoUrl?: string;
  registeredAt?: Date;
  enabledAt?: boolean;
}

class UserModel {
  async createUser(user: IUser) {
    const query = `
    INSERT INTO users (email, password, full_name, display_name,  birthday, photo_url, registered_at, enabled_at)
    VALUES ($1, $2, $3, $4, $5, $6, NOW(), true)
    RETURNING id, email, display_name, user_name, birthday, photo_url, registered_at, enabled_at;
    `;

    const values = [
      user.email,
      user.password,
      user.fullName,
      user.displayName,
      user.birthday,
      user.photoUrl || null,
    ];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  async findByEmail(email: string) {
    const query = `
SELECT * FROM user WHERE email = $1;`;

    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }
}

export default new UserModel();
