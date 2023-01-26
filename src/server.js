import express from "express"
import connectDB from "../db/config.js"
import performanceRoute from "../routes/performance.js"

const app = express()

// Connect to MongoDB
connectDB()

app.use('/performance', performanceRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
