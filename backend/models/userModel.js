import pool from '../config/db.js';

// Function to get user by email
const getUserByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
};

// Function to add a new user
const addUser = async (name, email, password) => {
    await pool.query(
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
        [name, email, password]
    );
};

export { getUserByEmail, addUser };
