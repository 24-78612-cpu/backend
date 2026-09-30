import pool from '../config/db.js';

//retrieve
export const fetch = async () => {
    const [rows] = await pool.query("SELECT * FROM book");
    return rows;
};