import pool from "../config/db.js";

const favoriteModel = {
    getAllFavorites: async () => {
        const result = await pool.query('SELECT * FROM favorites');
        return result.rows;
    },

    getFavoriteById: async (id) => {
        const result = await pool.query('SELECT * FROM favorites WHERE id = $1', [id]);
        return result.rows[0];
    },

    createFavorite: async (favoriteData) => {
        const { user_id, items } = favoriteData;
        const result = await pool.query(
        'INSERT INTO favorites (user_id, items) VALUES ($1, $2) RETURNING *',
        [user_id, items]
        );
        return result.rows[0];
    },

    updateUser: async(id, favoriteData) => {
        const { user_id, items } = favoriteData;
        const result = await pool.query(
        'UPDATE users SET user_id = $1, items = $2 WHERE id = $3 RETURNING *',
        [user_id, items, id]
        );
        return result.rows[0];
    }

};

export default favoriteModel;