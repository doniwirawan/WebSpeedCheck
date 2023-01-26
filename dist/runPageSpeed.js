import puppeteer from "puppeteer"
import lighthouse from "lighthouse"
import { URL } from "url"

async function runPageSpeed(url, device = "mobile") {
  try {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    if (device == 'mobile') {
      // Set the viewport to emulate a desktop device
      await page.setViewport({ width: 360, height: 640 })
      await page.goto(url)
    } else {
      // Set the viewport to emulate a mobile device
      await page.setViewport({ width: 1920, height: 1080 })
      await page.goto(url)
    }

    // Collect performance metrics
    const performance = await page.evaluate(() => JSON.parse(JSON.stringify(window.performance)))

    // Use Lighthouse to audit the page
    const { lhr } = await lighthouse(url, {
      port: (new URL(browser.wsEndpoint())).port,
      output: "json",
      logLevel: "info",
    })

    // Extract the scores
    const performanceScore = lhr.categories.performance.score * 100
    const accesibilityScore = lhr.categories.accessibility.score * 100
    const bestPracticesScore = lhr.categories["best-practices"].score * 100
    const seoScore = lhr.categories.seo.score * 100

    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart

    // Collect additional metrics
    const metrics = await page.metrics()

    return {
      layoutDuration: metrics.LayoutDuration,
      scriptDuration: metrics.ScriptDuration,
      taskDuration: metrics.TaskDuration,
      performanceScore,
      accesibilityScore,
      bestPracticesScore,
      seoScore,
      loadTime,
    }

    await browser.close()
  } catch (err) {
    return err
  }
}

export default runPageSpeed
