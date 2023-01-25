import puppeteer from "puppeteer"
import lighthouse from "lighthouse"
import { URL } from "url"
import { program } from "commander"
import figletHelper from "./helper/figletHelper.js"

program
    .version("1.0.0")
    .option("-u, --url <url>", "URL to test")
    .parse(process.argv)

if (!program._optionValues.url) {
    console.error("You must provide a URL to test")
    process.exit(1)
}

async function runPageSpeed(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Set the viewport to emulate a desktop device
    await page.setViewport({ width: 1920, height: 1080 })
    await page.goto(url)

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
    const bestPracticesScore = lhr.categories["best-practices"].score * 100
    const seoScore = lhr.categories.seo.score * 100

    console.log(`Load time: ${performance.timing.loadEventEnd - performance.timing.navigationStart} ms`)

    // Collect additional metrics
    const metrics = await page.metrics()

    figletHelper(`Layout duration:\n ${metrics.LayoutDuration} ms`)

    figletHelper(`Script duration:\n ${metrics.ScriptDuration} ms`)

    figletHelper(`Task duration:\n ${metrics.TaskDuration} ms`)



    if (performanceScore >= 90) {
        figletHelper(`Performance Score:\n ${performanceScore} % `, 'green')
    } else if (performanceScore >= 80) {
        figletHelper(`Performance Score:\n ${performanceScore} % `, 'yellow')
    } else {
        figletHelper(`Performance Score:\n ${performanceScore} % `, 'red')
    }

    if (bestPracticesScore >= 90) {
        figletHelper(`Best practices Score:\n ${bestPracticesScore} % `, 'green')
    } else if (bestPracticesScore >= 80) {
        figletHelper(`Best practices Score:\n ${bestPracticesScore} % `, 'yellow')
    } else {
        figletHelper(`Best practices Score:\n ${bestPracticesScore} % `, 'red')
    }

    if (seoScore >= 90) {
        figletHelper(`SEO practices Score:\n ${seoScore} % `, 'green')
    } else if (seoScore >= 80) {
        figletHelper(`SEO practices Score:\n ${seoScore} % `, 'yellow')
    } else {
        figletHelper(`SEO practices Score:\n ${seoScore} % `, 'red')
    }

    await browser.close()
}

// Example usage
runPageSpeed(program._optionValues.url)

export default runPageSpeed
