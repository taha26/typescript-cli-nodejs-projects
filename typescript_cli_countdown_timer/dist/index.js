import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------
            Countdown Timer
------------------------------------------

`));
(async () => {
    const { userInput } = await Inquirer.prompt([
        {
            name: "userInput",
            type: "input",
            message: "Enter a date and time e.g: 3 july 2020 14:10:00 : ",
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
    const countDownDate = new Date(userInput).getTime();
    const interval = setInterval(function () {
        // Get today's date and time
        const now = new Date().getTime();
        // Find the distance between now and the count down date
        const distance = countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(interval);
            console.log(chalk.red("EXPIRED"));
            return;
        }
        // Display the result
        console.log(chalk.green(days + "d " + hours + "h " + minutes + "m " + seconds + "s "));
    }, 1000);
})();
