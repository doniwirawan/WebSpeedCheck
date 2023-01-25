import chalk from "chalk"
import figlet from "figlet"

export default function figletHelper (msg, color = "green") {
  figlet.text(msg, {
    font: "standard",
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 80,
    kerning: "default",
  }, (err, data) => {
    if (err) {
      console.log("Something went wrong...")
      console.dir(err)
      return
    }
    console.log(chalk[color](data))
  })
}
