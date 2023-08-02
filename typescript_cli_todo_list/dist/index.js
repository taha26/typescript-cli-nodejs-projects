import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------
                TODO LIST
------------------------------------------

`));
(async () => {
    let status = true;
    const todoList = [];
    while (status) {
        const { options } = await Inquirer.prompt([
            {
                name: "options",
                message: "Select an option",
                type: "list",
                choices: ["Add item", "Item List", "Delete item", "Delete all item", "Exit"]
            },
        ]);
        if (options === "Add item") {
            const { item } = await Inquirer.prompt([
                {
                    name: "item",
                    message: "Enter an item : ",
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
            todoList.push(item);
            console.log(chalk.green(`Item added.`));
        }
        if (options === "Item List") {
            console.log(chalk.gray(`Todo List :`));
            if (!todoList.length)
                console.log(chalk.red(`No item added`));
            for (let i = 0; i < todoList.length; i++) {
                console.log(chalk.green(todoList[i]));
            }
        }
        if (options === "Delete item") {
            const { deleteItem } = await Inquirer.prompt([
                {
                    name: "deleteItem",
                    message: "Select an option to delete an item",
                    type: "list",
                    choices: todoList
                },
            ]);
            const index = todoList.indexOf(deleteItem);
            todoList.splice(index, 1);
            console.log(chalk.green(`Item deleted.`));
        }
        if (options === "Delete all item") {
            todoList.splice(0, todoList.length);
            console.log(chalk.green(`Items deleted.`));
        }
        if (options === "Exit") {
            status = false;
        }
    }
})();
