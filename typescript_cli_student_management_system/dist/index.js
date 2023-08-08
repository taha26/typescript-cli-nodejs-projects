import Inquirer from "inquirer";
import chalk from "chalk";
console.log(chalk.blue(`

------------------------------------------
        Student Management System
------------------------------------------

`));
class Students {
    constructor(name, balance, courses) {
        this.courses = [];
        this.name = name;
        this.id = ++Students.count;
        this.balance = balance;
        this.courses.push(courses);
    }
}
Students.count = 1000;
(async () => {
    let status = true;
    const students = [];
    while (status) {
        const { options } = await Inquirer.prompt([
            {
                name: "options",
                message: "Select an option",
                type: "list",
                choices: ["Add Student", "Student List", "Exit"]
            },
        ]);
        if (options === "Add Student") {
            const { name, balance, courses } = await Inquirer.prompt([
                {
                    name: "name",
                    message: "Enter the student name : ",
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
                    name: "balance",
                    message: "Select student balance : ",
                    type: "list",
                    choices: ["Paid", "Unpaid"]
                },
                {
                    name: "courses",
                    message: "Select a course to enroll : ",
                    type: "list",
                    choices: ["Web 3.0", "Web 2.0", "A.I", "Metaverse", "Blockchain"]
                },
            ]);
            let addStudent = new Students(name, balance, courses);
            students.push(addStudent);
            console.log(chalk.green(`\nStudent added.\n`));
        }
        if (options === "Student List") {
            const studentsList = [];
            for (let i = 0; i < students.length; i++) {
                studentsList.push(students[i].name);
            }
            if (!studentsList.length) {
                console.log(chalk.red("No students added ...!"));
                continue;
            }
            const { studentName } = await Inquirer.prompt([
                {
                    name: "studentName",
                    message: "Students List : ",
                    type: "list",
                    choices: studentsList
                },
            ]);
            const { name, id, balance, courses } = students.find((data) => data.name === studentName);
            const index = students.findIndex((data) => data.id === id);
            const { studentOptions } = await Inquirer.prompt([
                {
                    name: "studentOptions",
                    message: "Options : ",
                    type: "list",
                    choices: ["Show Status", "Add Balance", "Assign course", "Back"]
                },
            ]);
            if (studentOptions === "Back")
                continue;
            if (studentOptions === "Show Status") {
                console.log(chalk.yellow(`\n -------------- Status --------------`));
                console.log(chalk.gray(`\nname: ${name}`));
                console.log(chalk.gray(`id: ${id}`));
                console.log(chalk.gray(`balance: ${balance}`));
                console.log(chalk.gray(`courses: ${courses}\n`));
                continue;
            }
            if (studentOptions === "Add Balance") {
                const { studentBalance } = await Inquirer.prompt([
                    {
                        name: "studentBalance",
                        message: "Select student balance : ",
                        type: "list",
                        choices: ["Paid", "Unpaid"]
                    }
                ]);
                students[index].balance = studentBalance;
                console.log(chalk.green(`\nStudent Balance added.\n`));
                continue;
            }
            if (studentOptions === "Assign course") {
                const { studentCourse } = await Inquirer.prompt([
                    {
                        name: "studentCourse",
                        message: "Select student course : ",
                        type: "list",
                        choices: ["Web 3.0", "Web 2.0", "A.I", "Metaverse", "Blockchain"]
                    }
                ]);
                if (students[index].courses.includes(studentCourse)) {
                    console.log(chalk.red(`\nAlready assigned.\n`));
                    continue;
                }
                students[index].courses.push(studentCourse);
                console.log(chalk.green(`\nStudent new course assign.\n`));
                continue;
            }
        }
        if (options === "Exit") {
            status = false;
            console.log(chalk.blue(`\n ----- Thanks..! Have a nice day. ----- \n`));
        }
    }
})();
