
// Update  User cart data : /api/cart/:update

import User from '../models/User.js';

export const updateCart = async (req, res) => {
    try {
        const { userId, cartItems } = req.body;
        await User.findByIdAndUpdate(userId, { cartItems })
        res.json({
            success: true,
            message: "Cart updated successfully"
        });
    } catch (error) {
        console.log(error.message);
        res.json({
            success: false,
            message: "Failed to update cart",
            error: error.message
        });
    }
}