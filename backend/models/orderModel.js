import pool from '../config/db.js';

// Function to place a new order
const placeOrder = async (userId, items, amount, address) => {
    const result = await pool.query(
        'INSERT INTO orders (user_id, items, amount, address) VALUES ($1, $2, $3, $4) RETURNING id',
        [userId, JSON.stringify(items), amount, JSON.stringify(address)]
    );
    return result.rows[0].id;
};

// Function to update order payment status
const updatePaymentStatus = async (orderId, payment) => {
    await pool.query('UPDATE orders SET payment = $1 WHERE id = $2', [payment, orderId]);
};

// Function to get orders by userId
const getOrdersByUserId = async (userId) => {
    const result = await pool.query('SELECT * FROM orders WHERE user_id = $1', [userId]);
    return result.rows;
};

// Function to list all orders
const listAllOrders = async () => {
    const result = await pool.query('SELECT * FROM orders');
    return result.rows;
};

// Function to update order status
const updateOrderStatus = async (orderId, status) => {
    await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, orderId]);
};

export { placeOrder, updatePaymentStatus, getOrdersByUserId, listAllOrders, updateOrderStatus };
