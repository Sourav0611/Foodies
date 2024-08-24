import { client } from '../config/db.js'; // Import PostgreSQL client
import fs from 'fs';

// Add food item
const addFood = async (req, res) => {
    const imageFilename = req.file.filename;

    const { name, description, price, category } = req.body;

    const query = `INSERT INTO food (name, description, price, category, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, description, price, category, imageFilename];

    try {
        const result = await client.query(query, values);
        res.json({ success: true, message: "Food Added", data: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// List all food items
const listFood = async (req, res) => {
    const query = `SELECT * FROM food`;

    try {
        const result = await client.query(query);
        res.json({ success: true, data: result.rows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove food item
const removeFood = async (req, res) => {
    const { id } = req.body;

    try {
        const foodQuery = `SELECT image FROM food WHERE id = $1`;
        const foodResult = await client.query(foodQuery, [id]);

        if (foodResult.rows.length > 0) {
            const imageFilename = foodResult.rows[0].image;
            fs.unlink(`uploads/${imageFilename}`, () => {});

            const deleteQuery = `DELETE FROM food WHERE id = $1 RETURNING *`;
            const deleteResult = await client.query(deleteQuery, [id]);

            res.json({ success: true, message: "Food Removed", data: deleteResult.rows[0] });
        } else {
            res.json({ success: false, message: "Food item not found" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addFood, listFood, removeFood };
