import pool from "../config/db.js";

const userModel = {
    getAll: async () => {
        console.log("Consultando base de datos...");
        const res = await pool.query('SELECT * FROM users');
        return res.rows;
    },

};

export default userModel;