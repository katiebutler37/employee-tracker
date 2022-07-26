const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');

// const Employee = require("./lib/Employee")
// const Role = require("./lib/Role");
// const Department = require("./lib/Department");

//file for db queries in async promises (how?) from inquirer
//make separate file for constructor functions 

// inquirer
//     .prompt ({
//         //prompts here
//     })
//     .then ((answers) => {
//         const employee = new Employee (answers.promptName1, answers.promptName2)
//         console.table(s)
//          callbackFunction for intial prompt (menu)
//     })

//  startFunction()

const viewDepartments = () => {
    console.table
}

async function choosePrompt() {
    const { action } = await
        inquirer
            .prompt([
                {
                    type: "list",
                    name: "action",
                    message: "Please select from the following actions:",
                    choices: ['View Departments', 'Add Department', 'View Roles', 'Add Role', 'View Employees', 'Add Employee', 'Update Employee Role']
                }
            ])
    switch (action) {
        case 'View Departments':
            viewDepartments()
            break;
        case 'Add Department':
            break;
        case 'View Roles':
            break;
        case 'Add Role':
            break;
        case 'View Employees':
            break;
        case 'Add Employee':
            break;
        case 'Update Employee Role':
            break;
        default: 
    }



}

choosePrompt()