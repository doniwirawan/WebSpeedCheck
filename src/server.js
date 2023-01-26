import express from "express"
import mongoose from "mongoose"
import runPageSpeed from "../dist/runPageSpeed.js"
import connectDB from "../db/config.js"
import Performance from "../model/performance.js"

const app = express()

// Connect to MongoDB
connectDB()

// Create a route to test the performance of a URL
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
