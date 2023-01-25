import puppeteer from "puppeteer"
import lighthouse from "lighthouse"
import { URL } from "url"
import { program } from "commander"
import chalk from "chalk"
import figlet from "figlet"

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
    console.log(`Layout duration: ${metrics.LayoutDuration} ms`)
    console.log(`Script duration: ${metrics.ScriptDuration} ms`)
    console.log(`Task duration: ${metrics.TaskDuration} ms`)

    if (performanceScore >= 90) {
        figlet.text(`Performance Score: ${performanceScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.green(data))
        })
    } else if (performanceScore >= 80) {
        figlet.text(`Performance Score: ${performanceScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.yellow(data))
        })
    } else {
        figlet.text(`Performance Score: ${performanceScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.red(data))
        })
    }

    if (bestPracticesScore >= 90) {
        figlet.text(`Best Practices Score: ${bestPracticesScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.green(data))
        })
    } else if (bestPracticesScore >= 80) {
        figlet.text(`Best Practices Score: ${bestPracticesScore} %`, {
            font: "Doom",
            horizontal,
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.yellow(data))
        })
    } else {
        figlet.text(`Best Practices Score: ${bestPracticesScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.red(data))
        })
    }

    if (seoScore >= 90) {
        figlet.text(`SEO Score: ${seoScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.green(data))
        })
    } else if (seoScore >= 80) {
        figlet.text(`SEO Score: ${seoScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.yellow(data))
        })
    } else {
        figlet.text(`SEO Score: ${seoScore} %`, {
            font: "Doom",
            horizontalLayout: "default",
            verticalLayout: "default",
        }, (err, data) => {
            if (err) {
                console.log("Something went wrong...")
                console.dir(err)
                return
            }
            console.log(chalk.red(data))
        })
    }

    await browser.close()
}

// Example usage
runPageSpeed(program._optionValues.url)

export default runPageSpeed