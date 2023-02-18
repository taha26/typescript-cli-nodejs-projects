import Inquirer from "inquirer";

interface UserInput {

    first_num: number,
    operator: string,
    second_num: number,
}

const userInput: UserInput = await Inquirer.prompt([
    {
        name: "first_num",
        type: 'number',
        message: "Enter first number"
    },
    {
        name: "operator",
        type: 'list',
        choices: ["+", "-", "*", "/"],
        message: "Select operator"
    },
    {
        name: "second_num",
        type: 'number',
        message: "Enter second number"
    },
])


const calculate = (input_data: UserInput) => {

    const { first_num, operator, second_num } = input_data

    if (!first_num && !operator && !second_num) {
        console.log("Invalid input")
        return
    }

    let result: number = 0;

    if (operator === "+") {
        result = first_num + second_num
        console.log(`Result : ${result}`);
        return
    }
    if (operator === "-") {
        result = first_num - second_num
        console.log(`Result : ${result}`);
        return
    }
    if (operator === "*") {
        result = first_num * second_num
        console.log(`Result : ${result}`);
        return
    }
    if (operator === "/") {
        result = first_num / second_num
        console.log(`Result : ${result}`);
        return
    }

}


calculate(userInput)

