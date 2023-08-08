import Inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.blue(`

------------------------------------------
            Adventure Game
------------------------------------------

`));

(async () => {

    let status = true;
    const enemies: string[] = ["Zombie", "Alien", "Evil Ninja"];
    const randomNumber = Math.floor(Math.random() * 3)
    console.log(chalk.redBright(`
    ___________________________________________________________
    
                Ohhh ${enemies[randomNumber]} appears..!
    ___________________________________________________________

    `));

    let enemyHealth = Math.floor(Math.random() * 100)
    let playerHealth = Math.floor(Math.random() * 100)

    while (status) {
        const { options }: { options: "Attack" | "Run" } = await Inquirer.prompt([
            {
                name: "options",
                message: "What to do?",
                type: "list",
                choices: ["Attack", "Run"]
            },
        ])

        if (options === "Run") {
            status = false
            break
        }

        if (options === "Attack") {
            
            enemyHealth = Math.floor(Math.random() * enemyHealth)
            playerHealth = Math.floor(Math.random() * playerHealth)
            console.log(chalk.gray(`\n\nYour HP : ${chalk.greenBright(playerHealth)}            ${chalk.red(enemies[randomNumber])} HP : ${chalk.greenBright(enemyHealth)}\n\n`));

            if (enemyHealth <= 0) {
                console.log(chalk.green(`\n\n------------- You Win  -------------\n`));
                break
            }

            if (playerHealth <= 0) {
                console.log(chalk.red(`\n\n------------- You Loss  -------------\n`));
                break
            }
        }
    }
}
)()