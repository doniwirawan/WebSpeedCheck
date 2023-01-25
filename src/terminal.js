import { program } from "commander"
import runPageSpeed from "../helper/runPageSpeed.js"

program
  .version("1.0.0")
  .option("-u, --url <url>", "URL to test")
  .parse(process.argv)

const { url } = program._optionValues

if (!url) {
  console.error("You must provide a URL to test")
  process.exit(1)
}

// Example usage
const result = await runPageSpeed(url)
console.log(result)
