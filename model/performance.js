import mongoose from "mongoose"

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

export default Performance
