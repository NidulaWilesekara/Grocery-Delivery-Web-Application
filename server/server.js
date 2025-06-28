import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db1.js';
import userRouter from './routes/userRoutes.js';
import sellerRouter from './routes/sellerRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRouter.js';

const app = express();
const port = process.env.PORT || 4000;

const startServer = async () => {



await connectDB();
await connectCloudinary();


    const allowedOrigins = ['http://localhost:5173'];

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: allowedOrigins, credentials: true }));

    app.get('/', (req, res) => res.send("API is working"));
    app.use('/api/user', userRouter)
    app.use('/api/seller',sellerRouter)
    app.use('/api/product', productRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/address', addressRouter)
    app.use('/api/order', orderRouter)






    app.listen(port, () => {
        console.log(`🚀 Server is running at http://localhost:${port}`);
    });
};

startServer();
