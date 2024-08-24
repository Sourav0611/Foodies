import pool from '../config/db.js';

// Function to get all food items
const getAllFoods = async () => {
    const result = await pool.query('SELECT * FROM foods');
    return result.rows;
};

// Function to add a new food item
const addFood = async (name, description, price, category, image) => {
    await pool.query(
        'INSERT INTO foods (name, description, price, category, image) VALUES ($1, $2, $3, $4, $5)',
        [name, description, price, category, image]
    );
};

// Function to remove a food item
const removeFood = async (id) => {
    await pool.query('DELETE FROM foods WHERE id = $1', [id]);
};

export { getAllFoods, addFood, removeFood };
