import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURL = `${process.env.MONGODB_URL}/Greencart`;
        console.log("Trying to connect to:", mongoURL); // ✅ Add this

        await mongoose.connect(mongoURL);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
    }
};

export default connectDB;
