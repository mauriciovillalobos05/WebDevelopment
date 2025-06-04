import pool from "../config/db.js";
import bcrypt from 'bcryptjs';

const userModel = {
    getAllUsers: async () => {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    },

    getUserById: async (id) => {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    },
    
    getUserByEmail: async (mail) => {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [mail]);
      return result.rows[0];
    },

    createUser: async (userData) => {
      const { name, email, password } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const result = await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
        [name, email, hashedPassword]
      );
      return result.rows[0];
    },

    updateUser: async(id, userData) => {
    const { name, email, password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'UPDATE users SET name = $1, email=$2, password=$3 WHERE id = $4 RETURNING *',
      [name, email, hashedPassword, id]
    );
    return result.rows[0];
  }
};

export default userModel;