import Inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue(`

------------------------------------------
            Word Counter
------------------------------------------

`));


(async () => {
    let status = true

    while (status) {
        const { options }: { options: "Start" | "Exit" } = await Inquirer.prompt([
            {
                name: "options",
                type: "list",
                choices: ["Start", "Exit"],
            },
        ])

        if (options === "Exit") {
            console.log(chalk.gray("Thanks..! have a nice day."));
            status = false
            return
        }

        const { userInput }: { userInput: string } = await Inquirer.prompt([
            {
                name: "userInput",
                type: "input",
                message: "Enter a paragraph to count characters and words : ",
                validate: (input: string) => {
                    if (!input) {
                        return "Invaild input"
                    }
                    else {
                        return true
                    }
                }
            }
        ]);
        const characters = userInput.split(' ').join('').length
        const words = userInput.split(' ').length
        console.log(chalk.gray(`Paragraph contains ${chalk.blue(characters)} characters and ${chalk.blue(words)} words.`));
    }
}
)()