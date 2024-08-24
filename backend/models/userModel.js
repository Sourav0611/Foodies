import pool from '../config/db.js';

// Function to update cart data
const updateCartData = async (userId, cartData) => {
    try {
        const query = 'UPDATE users SET cart_data = $1 WHERE id = $2';
        const values = [cartData, userId];
        await pool.query(query, values);
    } catch (error) {
        console.error('Error updating cart data:', error);
        throw error; // Propagate the error for handling in the calling function
    }
};

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

export { updateCartData, getUserByEmail, addUser };
