import pool from '../config/db.js';

export const insert = async (name, email, password) => {
    const [result] = await pool.query(
        'INSERT INTO `user` (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
    );

    return result.insertId;
};

export const findUserByEmail = async (email) => {
    const [rows] = await pool.query(
        'SELECT id, name, email, password FROM `user` WHERE email = ?',
        [email]
    );
    return rows;
};
