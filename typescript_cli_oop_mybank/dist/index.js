import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------
                My Bank
------------------------------------------

`));
class BankAccount {
    constructor() {
        this.accountBalance = 0;
        this.accountNumber = 0;
        this.accountBalance = 100;
        this.accountNumber = ++BankAccount.generateAccNumber;
    }
    Debit(amount) {
        return this.accountBalance -= amount;
    }
    Credit(amount) {
        if (amount > 100) {
            return this.accountBalance += amount - 1;
        }
        else {
            return this.accountBalance += amount;
        }
    }
}
BankAccount.generateAccNumber = 10000;
class Customer {
    constructor(name, age, pin, userId) {
        this.name = name;
        this.age = age;
        this.pin = pin;
        this.userId = userId;
        this.bankAccount = new BankAccount();
    }
}
// const cus = new Customer("taha", 12, 12, "12");
// console.log(cus.name);
// console.log(cus.bankAccount.accountBalance);
// console.log(cus.bankAccount.Credit(50));
// console.log(cus.bankAccount.Debit(20));
// console.log(cus.bankAccount.accountBalance);
(async () => {
    let status = true;
    const customers = [];
    while (status) {
        const { userInput } = await Inquirer.prompt([
            {
                name: "userInput",
                message: "Select an option : ",
                type: "list",
                choices: ["Create an account", "Login to an account", "Quit"]
            },
        ]);
        if (userInput === "Quit") {
            status = false;
        }
        if (userInput === "Create an account") {
            const { name, age, pin, userId } = await Inquirer.prompt([
                {
                    name: "name",
                    message: "Enter your name : ",
                    type: "input",
                    validate: (result) => {
                        if (!result) {
                            return "Wrong input..!";
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "age",
                    message: "Enter your age : ",
                    type: "number",
                    validate: (result) => {
                        if (!result) {
                            return "Wrong input..!";
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "pin",
                    message: "Enter a pin : ",
                    type: "number",
                    validate: (result) => {
                        if (!result) {
                            return "Wrong input..!";
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "userId",
                    message: "Enter a userId : ",
                    type: "input",
                    validate: (result) => {
                        if (!result) {
                            return "Wrong input..!";
                        }
                        else {
                            return true;
                        }
                    }
                },
            ]);
            let addCustomer = new Customer(name, age, pin, userId);
            customers.push(addCustomer);
            console.log(chalk.green(`\nAccount Created.\n`));
            continue;
        }
        if (userInput === "Login to an account") {
            const { pin, userId } = await Inquirer.prompt([
                {
                    name: "pin",
                    message: "Enter a pin : ",
                    type: "number",
                    validate: (result) => {
                        if (!result) {
                            return "Wrong input..!";
                        }
                        else {
                            return true;
                        }
                    }
                },
                {
                    name: "userId",
                    message: "Enter a userId : ",
                    type: "input",
                    validate: (result) => {
                        if (!result) {
                            return "Wrong input..!";
                        }
                        else {
                            return true;
                        }
                    }
                },
            ]);
            if (!customers.length) {
                console.log(chalk.red(`\nNo customer found...!\n`));
                break;
            }
            const { name, age, bankAccount: { accountBalance, accountNumber, Credit, Debit } } = customers.find((data) => data.pin === pin && data.userId === userId);
            if (!name && !userId) {
                console.log(chalk.red(`\nInvalid inputs.\n`));
                break;
            }
            let loginStatus = true;
            while (loginStatus) {
                const { loginOptions } = await Inquirer.prompt([
                    {
                        name: "loginOptions",
                        message: "Select an option : ",
                        type: "list",
                        choices: ["Account Information", "Debit", "Credit", "Quit"]
                    },
                ]);
                if (loginOptions === "Quit") {
                    loginStatus = false;
                    continue;
                }
                if (loginOptions === "Account Information") {
                    console.log(chalk.whiteBright(`\n--------------------------------------`));
                    console.log(chalk.whiteBright(`Name            : ${name}`));
                    console.log(chalk.whiteBright(`Age             : ${age}`));
                    console.log(chalk.whiteBright(`UserID          : ${userId}`));
                    console.log(chalk.whiteBright(`Account Balance : Rs: ${accountBalance}`));
                    console.log(chalk.whiteBright(`Account Number  : ${accountNumber}`));
                    console.log(chalk.whiteBright(`--------------------------------------\n`));
                    continue;
                }
                if (loginOptions === "Credit") {
                    try {
                        const { amount } = await Inquirer.prompt([{
                                name: 'amount',
                                message: 'Enter an amount : ',
                                type: 'number',
                                validate: (result) => {
                                    if (!result) {
                                        return "Wrong input..!";
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }]);
                        const credit = Credit(amount);
                        console.log(credit);
                        console.log(chalk.green(`\nCredited successfully\n`));
                        continue;
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
                if (loginOptions === "Debit") {
                    try {
                        const { amount } = await Inquirer.prompt([{
                                name: 'amount',
                                message: 'Enter an amount : ',
                                type: 'number',
                                validate: (result) => {
                                    if (!result) {
                                        return "Wrong input..!";
                                    }
                                    else {
                                        return true;
                                    }
                                }
                            }]);
                        if (amount > accountBalance) {
                            console.log(chalk.green(`\nInsufficient balance...!\n`));
                            continue;
                        }
                        const debit = Debit(amount);
                        console.log(chalk.green(`\nDebited successfully...!\n`));
                        continue;
                    }
                    catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }
})();
