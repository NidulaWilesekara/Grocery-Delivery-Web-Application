import Product from '../models/Product.js';
import Order from '../models/Order.js';



// Place order COD : /api/order/cod

export const placeOrderCOD = async (req, res) => {
    try {
        const { userId, items, address} = req.body;
        if(!address||!items.length === 0) {
            return res.json({success: false, message: "invalid data"});
        }

        // Calculate Amount Using items
        let amount =  await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return await acc + (product.offeredPrice * item.quantity);
        }, 0);


        //Add tax charge (2%)
        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            address,
            amount,
            paymentType: "COD",
        });

        return res.json({
            success: true,
            message: "Order Placed Successfully",
        });
    }
    catch (error) {
        return res.json({
            success: false,
            message: "Order Placement Failed",
        });
    }
}


// get Orders by user id : /api/order/user

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.body;
        const orders = await Order.find({ userId, $or:[{paymentType: "COD"},
             {isPaid: true}] }).populate('items.product address').sort({ createdAt: -1 }); 
             res.json({
                 success: true,
                 orders
             });
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to Fetch Orders",
        });
    }
}

// get All Orders ( for seller / admin ) : /api/order/seller

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: true }]
            }).populate('items.product address').sort({ createdAt: -1 });
        res.json({
            success: true,
            orders
        });
    } catch (error) {
        return res.json({
            success: false,
            message: "Failed to Fetch Orders",
        });
    }
}

 


