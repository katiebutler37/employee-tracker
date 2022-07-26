const inquirer = require('inquirer');
const db = require('./db/connection');
const table = require('console.table');

//file for db queries in async promises from inquirer
//make separate file for constructor functions 

// inquirer
//     .prompt ({
//         //prompts here
//     })
//     .then ((answers) => {
//         const employee = new Employee (answers.promptName1, answers.promptName2)
//         console.table(s)
//     })