import mongoose from 'mongoose'

export default async function connectDB() {
    // Connect to MongoDB
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/web-performance", { useNewUrlParser: true })
        console.log("Mongodb connected")
    } catch (err) {
        console.log(err)
    }
}
