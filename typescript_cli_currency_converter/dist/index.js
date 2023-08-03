import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------
            CURRENCY CONVERTER
------------------------------------------

`));
(async () => {
    let status = true;
    const convertion = {
        PKR: {
            USD: 0.0044345898004435,
            GBP: 0.0037,
            PKR: 1
        },
        GBP: {
            USD: 1.21,
            PKR: 271.79,
            GBP: 1
        },
        USD: {
            PKR: 225.50,
            GBP: 0.83,
            USD: 1.00
        }
    };
    while (status) {
        const { options } = await Inquirer.prompt([
            {
                name: "options",
                type: "list",
                choices: ["Convert a currency", "Exit"],
            },
        ]);
        if (options === "Exit") {
            console.log(chalk.gray("Thanks for using our service..!"));
            status = false;
            return;
        }
        const { currency, convertionCurrency, convertionAmount } = await Inquirer.prompt([
            {
                type: "list",
                name: "currency",
                choices: ["PKR", "USD", "GBP"],
                message: "Select Your Currency: "
            },
            {
                type: "list",
                name: "convertionCurrency",
                choices: ["PKR", "USD", "GBP"],
                message: "Select Your Convertion Currency: ",
            },
            {
                type: "number",
                name: "convertionAmount",
                message: "Enter your convertion amount: ",
                validate: (input) => {
                    if (!input) {
                        return "Invaild input";
                    }
                    else {
                        return true;
                    }
                }
            }
        ]);
        if (currency === convertionCurrency) {
            console.log(chalk.red(`Invalid choice..!`));
        }
        else {
            let result = convertion[convertionCurrency][currency] * convertionAmount;
            console.log(chalk.gray(`Your Convertion of ${chalk.blue(currency)} to ${chalk.blue(convertionCurrency)} is : ${chalk.green(result)}`));
        }
    }
})();
