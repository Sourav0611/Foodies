import { client } from '../config/db.js'; // Import PostgreSQL client

// Add items to user cart
const addToCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        // Check if item already exists in cart
        const checkQuery = `SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2`;
        const checkResult = await client.query(checkQuery, [userId, itemId]);

        if (checkResult.rows.length > 0) {
            // Item exists, update quantity
            const updateQuery = `UPDATE cart_items SET quantity = quantity + 1 WHERE user_id = $1 AND item_id = $2 RETURNING *`;
            await client.query(updateQuery, [userId, itemId]);
        } else {
            // Item does not exist, insert new record
            const insertQuery = `INSERT INTO cart_items (user_id, item_id, quantity) VALUES ($1, $2, $3) RETURNING *`;
            await client.query(insertQuery, [userId, itemId, 1]);
        }

        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    const { userId, itemId } = req.body;

    try {
        // Check if item exists in cart
        const checkQuery = `SELECT * FROM cart_items WHERE user_id = $1 AND item_id = $2`;
        const checkResult = await client.query(checkQuery, [userId, itemId]);

        if (checkResult.rows.length > 0) {
            const currentQuantity = checkResult.rows[0].quantity;

            if (currentQuantity > 1) {
                // Update quantity if more than 1
                const updateQuery = `UPDATE cart_items SET quantity = quantity - 1 WHERE user_id = $1 AND item_id = $2 RETURNING *`;
                await client.query(updateQuery, [userId, itemId]);
            } else {
                // Remove item if quantity is 1
                const deleteQuery = `DELETE FROM cart_items WHERE user_id = $1 AND item_id = $2`;
                await client.query(deleteQuery, [userId, itemId]);
            }

            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    const { userId } = req.body;

    try {
        const query = `
            SELECT i.id AS item_id, i.name AS item_name, c.quantity
            FROM cart_items c
            JOIN items i ON c.item_id = i.id
            WHERE c.user_id = $1
        `;

        const result = await client.query(query, [userId]);
        res.json({ success: true, cartData: result.rows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart };
