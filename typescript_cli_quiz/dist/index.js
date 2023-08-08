import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------

                QUIZ

------------------------------------------

`));
(async () => {
    let questions = [
        {
            question: "What is a full form of JS?",
            options: ["JavaSwift", "JavaScript", "JSON"],
            answer: "JavaScript"
        },
        {
            question: "What is a full form of TS?",
            options: ["TypeSwift", "TypeScript", "TSON"],
            answer: "TypeScript"
        },
        {
            question: "TypeScript is a browser readable language.",
            options: ["true", "false"],
            answer: "false"
        }
    ];
    let status = true;
    while (status) {
        let score = 0;
        const { userInput } = await Inquirer.prompt([
            {
                name: "userInput",
                message: "Select an option",
                type: "list",
                choices: ["Start", "Quit"]
            },
        ]);
        if (userInput === "Quit") {
            status = false;
            break;
        }
        for (let i = 0; i < questions.length; i++) {
            const { question } = await Inquirer.prompt([
                {
                    name: "question",
                    message: `Q${i + 1}: ${questions[i].question}`,
                    type: "list",
                    choices: questions[i].options
                },
            ]);
            if (questions[i].answer === question) {
                score += 10;
            }
        }
        console.log(chalk.green(`\n\nYour score is : ${chalk.blue(score)} out of 30 \n\n`));
        const { userExit } = await Inquirer.prompt([
            {
                name: "userExit",
                message: "Select an option",
                type: "list",
                choices: ["Start Again", "Exit"]
            },
        ]);
        if (userExit === "Exit") {
            status = false;
            break;
        }
        if (userExit === "Start Again") {
            continue;
        }
    }
})();
