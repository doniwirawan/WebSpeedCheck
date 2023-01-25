import express from "express"
import mongoose from "mongoose"
import runPageSpeed from "./helper/runPageSpeed.js"

const app = express()

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/web-performance", { useNewUrlParser: true })

// Create a Mongoose schema for the performance data
const PerformanceSchema = new mongoose.Schema({
  url: String,
  load_time: Number,
  layout_duration: Number,
  script_duration: Number,
  task_duration: Number,
  performance_score: Number,
  best_practice_score: Number,
  seo_score: Number,
  created_at: { type: Date, default: Date.now },
})

// Create a Mongoose model for the performance data
const Performance = mongoose.model("Performance", PerformanceSchema)

app.get("/performance", async (req, res) => {
  const { url } = req.query

  try {
    if (!url) {
      return res.status(400).send({ error: "You must provide a URL to test" })
    }

    const result = await runPageSpeed(url)

    // Create a new Performance object
    const data = {
      url,
      load_time: result.loadTime,
      layout_duration: result.LayoutDuration,
      script_duration: result.scriptDuration,
      task_duration: result.taskDuration,
      performance_score: result.performanceScore,
      best_practice_score: result.bestPracticesScore,
      seo_score: result.seoScore,
    }
    const performanceData = new Performance(data)

    // Save the Performance object to the database
    await performanceData.save()

    return await res.status(200).send(data)
  } catch (error) {
    return res.status(500).send({ error: error.message })
  }
})

const port = process.env.PORT || 5000

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
