import Inquirer from "inquirer";
import chalk from "chalk";

interface UserInput {
    guessedNumber: number,
}

console.log(chalk.blue(`

------------------------------------------

            Number Guessing Game

------------------------------------------

`));


const guessingGame = async () => {

    let score = 0;
    let status = true;
    while (status) {

        const randomNumber = Math.floor(Math.random() * 10) + 1;
        const { guessedNumber }: UserInput = await Inquirer.prompt([
            {
                name: "guessedNumber",
                type: 'number',
                message: "Enter a number between 1 to 10 : "
            },
        ])
      
        if (guessedNumber === randomNumber) {
            score += 10
            console.log(chalk.green(`Congratulation..! you guessed it right... your score is : ${chalk.blue(score)}`));
        }
        else {
            console.log(chalk.red(`Sorry..! wrong guessed try again... your score is : ${chalk.greenBright(score)}`));
            status = false
        }
    }
}

guessingGame()