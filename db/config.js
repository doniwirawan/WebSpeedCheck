import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

export default async function connectDB() {
    // Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        console.log("Mongodb connected")
    } catch (err) {
        console.log(err)
    }
}
