import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------

                ATM

------------------------------------------

`));
const Atm = async () => {
    let status = true;
    let balance = Math.floor(Math.random() * 100000) + 1;
    const { userId, userPin } = await Inquirer.prompt([
        {
            name: "userId",
            type: 'input',
            message: "Enter your ID"
        },
        {
            name: "userPin",
            type: 'password',
            message: "Enter a Pin"
        },
    ]);
    if (!userId || !userPin)
        return console.log(chalk.red("Invalid input ..!"));
    while (status) {
        const { options } = await Inquirer.prompt([
            {
                name: "options",
                message: "Select an option",
                type: "list",
                choices: ["Cash withdrawl", "Balance", "Exit"]
            },
        ]);
        if (options === "Cash withdrawl") {
            console.log(chalk.green(`Current Balance : ${chalk.blue(balance)}`));
            const { withdrawlAmount } = await Inquirer.prompt([
                {
                    name: "withdrawlAmount",
                    message: "Enter an amount you want to withdrawl : ",
                    type: "number",
                    validate: (result) => {
                        if (result > balance) {
                            return "Insuficient balance";
                        }
                        else {
                            return true;
                        }
                    }
                },
            ]);
            balance -= withdrawlAmount;
            console.log(chalk.green(`Balance after withdrawl: ${chalk.blue(balance)}`));
        }
        if (options === "Balance") {
            console.log(chalk.green(`Current Balance : ${chalk.blue(balance)}`));
        }
        if (options === "Exit") {
            console.log(chalk.gray(`Thanks for using our service.`));
            status = false;
        }
    }
};
Atm();
