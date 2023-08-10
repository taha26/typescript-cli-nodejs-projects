import Inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue(`

------------------------------------------
                My Bank
------------------------------------------

`));

class BankAccount {
    accountBalance: number = 0
    accountNumber: number = 0
    static generateAccNumber: number = 10000

    constructor() {
        this.accountBalance = 100
        this.accountNumber = ++BankAccount.generateAccNumber
    }

    public Debit(amount: number) {
        this.accountBalance -= amount
    }

    public Credit(amount: number) {

        if (amount > 100) {
            this.accountBalance += amount - 1
        }
        else {
            this.accountBalance += amount
        }
    }
}

class Customer {
    name: string
    readonly userId: string
    age: number
    pin: number
    bankAccount: BankAccount

    constructor(name: string, age: number, pin: number, userId: string) {
        this.name = name
        this.age = age
        this.pin = pin
        this.userId = userId
        this.bankAccount = new BankAccount()
    }
}

(async () => {
    let status = true
    const customers: Customer[] = []

    while (status) {
        const { userInput }: { userInput: "Create an account" | "Login to an account" | "Quit" } = await Inquirer.prompt([
            {
                name: "userInput",
                message: "Select an option : ",
                type: "list",
                choices: ["Create an account", "Login to an account", "Quit"]
            },
        ])

        if (userInput === "Quit") {
            status = false
            console.log(chalk.blue(`\n -------- Thank you..! Have a nice day. -------- \n`));
        }

        if (userInput === "Create an account") {
            const { name, age, pin, userId
            }: Customer = await Inquirer.prompt([
                {
                    name: "name",
                    message: "Enter your name : ",
                    type: "input",
                    validate: (result: string) => {
                        if (!result) {
                            return "Wrong input..!"
                        } else {
                            return true
                        }
                    }
                },
                {
                    name: "age",
                    message: "Enter your age : ",
                    type: "number",
                    validate: (result: number) => {
                        if (!result) {
                            return "Wrong input..!"
                        } else {
                            return true
                        }
                    }
                },
                {
                    name: "pin",
                    message: "Enter a pin : ",
                    type: "number",
                    validate: (result: number) => {
                        if (!result) {
                            return "Wrong input..!"
                        } else {
                            return true
                        }
                    }
                },
                {
                    name: "userId",
                    message: "Enter a userId : ",
                    type: "input",
                    validate: (result: string) => {
                        if (!result) {
                            return "Wrong input..!"
                        } else {
                            return true
                        }
                    }
                },
            ])
            let addCustomer = new Customer(name, age, pin, userId)
            customers.push(addCustomer);
            console.log(chalk.green(`\nAccount Created.\n`));
            continue
        }

        if (userInput === "Login to an account") {
            const { pin, userId }: Customer = await Inquirer.prompt([
                {
                    name: "pin",
                    message: "Enter a pin : ",
                    type: "number",
                    validate: (result: number) => {
                        if (!result) {
                            return "Wrong input..!"
                        } else {
                            return true
                        }
                    }
                },
                {
                    name: "userId",
                    message: "Enter a userId : ",
                    type: "input",
                    validate: (result: string) => {
                        if (!result) {
                            return "Wrong input..!"
                        } else {
                            return true
                        }
                    }
                },
            ])

            if (!customers.length) {
                console.log(chalk.red(`\nNo customer found...!\n`));
                break
            }

            const { name, age, bankAccount } = customers.find((data) => data.pin === pin && data.userId === userId) as Customer

            if (!name && !userId) {
                console.log(chalk.red(`\nInvalid inputs.\n`));
                break
            }

            console.log(chalk.green(`\nLogin successfully.\n`));

            let loginStatus = true
            while (loginStatus) {
                const { loginOptions }: { loginOptions: "Account Information" | "Debit" | "Credit" | "Logout" } = await Inquirer.prompt([
                    {
                        name: "loginOptions",
                        message: "Select an option : ",
                        type: "list",
                        choices: ["Account Information", "Debit", "Credit", "Logout"]
                    },
                ])

                if (loginOptions === "Logout") {
                    loginStatus = false
                    console.log(chalk.green(`\nLogout successfully.\n`));
                    continue
                }

                if (loginOptions === "Account Information") {
                    console.log(chalk.whiteBright(`\n--------------------------------------`))
                    console.log(chalk.whiteBright(`Name            : ${name}`))
                    console.log(chalk.whiteBright(`Age             : ${age}`))
                    console.log(chalk.whiteBright(`UserID          : ${userId}`))
                    console.log(chalk.whiteBright(`Account Balance : Rs: ${bankAccount.accountBalance}`))
                    console.log(chalk.whiteBright(`Account Number  : ${bankAccount.accountNumber}`))
                    console.log(chalk.whiteBright(`--------------------------------------\n`))
                    continue
                }

                if (loginOptions === "Credit") {
                    const { amount }: { amount: number } = await Inquirer.prompt([{
                        name: 'amount',
                        message: 'Enter an amount : ',
                        type: 'number',
                        validate: (result: number) => {
                            if (!result) {
                                return "Wrong input..!"
                            } else {
                                return true
                            }
                        }
                    }])

                    if (amount > 100) {
                        bankAccount.Credit(amount)
                        console.log(chalk.green(`\nCredited successfully\n`));
                        console.log(chalk.yellow(`Rs:1 fee charged on every transaction above Rs:100 ...!\n`));
                        continue
                    }
                    bankAccount.Credit(amount)
                    console.log(chalk.green(`\nCredited successfully\n`));
                    continue
                }

                if (loginOptions === "Debit") {
                    const { amount }: { amount: number } = await Inquirer.prompt([{
                        name: 'amount',
                        message: 'Enter an amount : ',
                        type: 'number',
                        validate: (result: number) => {
                            if (!result) {
                                return "Wrong input..!"
                            } else {
                                return true
                            }
                        }
                    }])

                    if (amount > bankAccount.accountBalance) {
                        console.log(chalk.green(`\nInsufficient balance...!\n`));
                        continue
                    }
                    bankAccount.Debit(amount)
                    console.log(chalk.green(`\nDebited successfully...!\n`));
                    continue
                }
            }
        }
    }
})()