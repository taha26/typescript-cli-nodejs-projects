import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------
                OOP
------------------------------------------

`));
class Person {
    constructor() {
        this._personality = "Mystery";
    }
    AskQuestion(answer) {
        if (answer === 1) {
            this._personality = "Extrovert";
        }
        else if (answer === 2) {
            this._personality = "Introvert";
        }
        else {
            this._personality = "Mystery";
        }
    }
    GetPersonality() {
        return this._personality;
    }
}
class Student extends Person {
    constructor() {
        super();
        this._name = '';
    }
    get Name() {
        return this._name;
    }
    set Name(name) {
        this._name = name;
    }
}
const { num } = await Inquirer.prompt([{
        name: 'num',
        type: 'number',
        message: 'Type 1 if you like to talk to others and 2 if you would rather keep it to yourself : '
    }]);
const MyStudent = new Student();
MyStudent.AskQuestion(num);
console.log(`\nYou are : ${chalk.blue(MyStudent.GetPersonality())}\n`);
const { name } = await Inquirer.prompt([{
        name: 'name',
        message: 'Enter your name : '
    }]);
MyStudent.Name = name;
console.log(`\nYour name is : ${chalk.blue(MyStudent.Name)} and your personality is : ${chalk.blue(MyStudent.GetPersonality())} `);
