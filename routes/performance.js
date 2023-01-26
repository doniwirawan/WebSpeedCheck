import express from "express"
import runPageSpeed from "../dist/runPageSpeed.js"
import Performance from "../model/performance.js"

const router = express.Router()

// Create a route to test the performance of a URL
router.get("/", async (req, res) => {
    const { url } = req.query

    try {
        if (!url) {
            try {
                const data = await Performance.find({}).sort({ created_at: -1 }).limit(1)
                return await res.status(200).send(data)
            } catch (error) {
                return res.status(500).send({ error: error.message })
            }
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
            accesibility_score: result.accesibilityScore,
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

// Create a route to get the last 10 performance data 
router.get("/history", async (req, res) => {
    try {
        const data = await Performance.find({}).sort({ created_at: -1 }).limit(10)
        return await res.status(200).send(data)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

// create a route to get a specific performance data
router.get("/history/:id", async (req, res) => {
    try {
        const data = await Performance.findById(req.params.id)
        return await res.status(200).send(data)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

// create a route to delete a specific performance data
router.delete("/history/:id", async (req, res) => {
    try {
        const data = await Performance.findByIdAndDelete(req.params.id)
        return await res.status(200).send(data)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
})

export default router
