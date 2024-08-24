import { placeOrder, updatePaymentStatus, getOrdersByUserId, listAllOrders, updateOrderStatus } from '../models/orderModel.js';
import { getUserByEmail, updateCartData } from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Place an order
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        const { userId, items, amount, address } = req.body;
        const orderId = await placeOrder(userId, items, amount, address);
        
        await updateCartData(userId, {});

        const line_items = items.map(item => ({
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100 * 275
            },
            quantity: item.quantity
        }));

        line_items.push({
            price_data: {
                currency: 'pkr',
                product_data: {
                    name: 'Delivery Charges'
                },
                unit_amount: 2 * 100 * 275
            },
            quantity: 1
        });

        const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${orderId}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${orderId}`,
        });

        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Verify an order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;

    try {
        if (success === 'true') {
            await updatePaymentStatus(orderId, true);
            res.json({ success: true, message: 'Paid' });
        } else {
            await updateOrderStatus(orderId, 'Cancelled');
            res.json({ success: false, message: 'Not Paid' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Get user orders
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await getOrdersByUserId(userId);
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// List all orders (for admin)
const listOrders = async (req, res) => {
    try {
        const orders = await listAllOrders();
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Update order status
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await updateOrderStatus(orderId, status);
        res.json({ success: true, message: 'Status Updated' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
