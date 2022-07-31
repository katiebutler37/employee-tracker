const inquirer = require("inquirer");
const db = require("./db/connection");
const table = require("console.table");
const myDatabase = require('./lib/Database')
const connection = new myDatabase();

const viewDepartments = async () => {
  const { departments } = await connection.getDepartments();
  console.table(departments);
};

const viewRoles = async () => {
  const { roles } = await connection.getRoles();
  console.table(roles);
};

async function addDepartment() {
  const { department_name } = await inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Please enter the name of the department you would like to add.",
      //makes answer required
      validate: (departmentInput) => {
        if (departmentInput) {
          return true;
        } else {
          console.log(
            "You must enter the name of the department you would like to add before continuing."
          );
          return false;
        }
      },
    },
  ]);
  //query to INSERT INTO departments
}
async function addRole() {

  const { departmentNames } = await connection.getDepartmentNames();

  const { title, salary, department_option } = await
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "Please enter the title of the role you would like to add.",
        //makes answer required
        validate: (titleInput) => {
          if (titleInput) {
            return true;
          } else {
            console.log(
              "You must enter the title of the role you would like to add before continuing."
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary of this role.",
        //makes answer required
        validate: (salaryInput) => {
          if (salaryInput) {
            return true;
          } else {
            console.log("You must enter the salary of this role.");
            return false;
          }
        },
      },
      {
        type: "list",
        name: "department_option",
        message: "Please select the department your new role belongs to.",
        choices: departmentNames
        //make choices display as an array of existing department names where the department id is equal to the index (db.departments.department_name)
      },
    ]);
  // 
  //function to retun the index value of the obj chosen and set equal to department_id
  //const role = new Role (title, salary, department_id)
  //query to INSERT INTO departments role obj
}
async function addEmployee() {
  const { first_name, last_name, manager_option, role_option } =
    await inquirer.prompt([
      {
        type: "input",
        name: "first_name",
        message:
          "Please enter the first name of the employee you would like to add.",
        //makes answer required
        validate: (firstNameInput) => {
          if (firstNameInput) {
            return true;
          } else {
            console.log(
              "You must enter the first name of the emloyee you would like to add before continuing."
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "last_name",
        message:
          "Please enter the last name of the employee you would like to add.",
        //makes answer required
        validate: (lastNameInput) => {
          if (lastNameInput) {
            return true;
          } else {
            console.log(
              "You must enter the last name of the emloyee you would like to add before continuing."
            );
            return false;
          }
        },
      },
    ]);
  //query to INSERT INTO departments
}
async function choosePrompt() {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "Please select from the following actions:",
      choices: [
        "View Departments",
        "Add Department",
        "View Roles",
        "Add Role",
        "View Employees",
        "Add Employee",
        "Update Employee Role",
      ],
    },
  ]);
  switch (action) {
    case "View Departments":
      await viewDepartments();
      break;
    case "Add Department":
      await addDepartment();
      break;
    case "View Roles":
      await viewRoles();
      break;
    case "Add Role":
      await addRole();
      break;
    case "View Employees":
      break;
    case "Add Employee":
      break;
    case "Update Employee Role":
      break;
    default:
  }
}
choosePrompt();



// const inquirer = require('inquirer');
// const db = require('./db/connection');
// const table = require('console.table');

// const Employee = require("./lib/Employee")
// const Role = require("./lib/Role");
// const Department = require("./lib/Department");

// //file for db queries in async promises (how?) from inquirer
// //make separate file for constructor functions 

// // inquirer
// //     .prompt ({
// //         //prompts here
// //     })
// //     .then ((answers) => {
// //         const employee = new Employee (answers.promptName1, answers.promptName2)
// //         console.table(s)
// //          callbackFunction for intial prompt (menu)
// //     })

// //  startFunction()

// const viewDepartments = () => {
//     console.table
// }

// async function addDepartment() {
//     const { department_name } = await
//         inquirer
//             .prompt([
//                 {
//                     type: "input",
//                     name: "department_name",
//                     message: "Please enter the name of the department you would like to add.",
//                     //makes answer required
//                     validate: departmentInput => {
//                         if (departmentInput) {
//                             return true;
//                         } else {
//                             console.log('You must enter the name of the department you would like to add before continuing.');
//                             return false;
//                         }
//                     }
//                 }
//             ])
//     //query to INSERT INTO departments
// }

// async function addRole() {
//     // let results = '';
//     db.query(`SELECT department_name FROM departments`,
//     function(err, results) {
//         if (err) {
//             console.log("Error.")
//         }
//         // const { title, salary, department_option } = await
//             inquirer
//                 .prompt([
//                     {
//                         type: "input",
//                         name: "title",
//                         message: "Please enter the title of the role you would like to add.",
//                         //makes answer required
//                         validate: titleInput => {
//                             if (titleInput) {
//                                 return true;
//                             } else {
//                                 console.log('You must enter the title of the role you would like to add before continuing.');
//                                 return false;
//                             }
//                         }
//                     },
//                     {
//                         type: "input",
//                         name: "salary",
//                         message: "Please enter the salary of this role.",
//                         //makes answer required
//                         validate: salaryInput => {
//                             if (salaryInput) {
//                                 return true;
//                             } else {
//                                 console.log('You must enter the salary of this role.');
//                                 return false;
//                             }
//                         }
//                     },
//                     {
//                         type: "list",
//                         name: "department_option",
//                         message: "Please select the department your new role belongs to.",
//                         choices: [`${results}`]
//                         //make choices display as an array of existing department names where the department id is equal to the index (db.departments.department_name)
//                     },
//                 ])
//                 //function to retun the index value of the obj chosen and set equal to department_id
//          //const role = new Role (title, salary, department_id)       
//         //query to INSERT INTO departments role obj
//     });

// }

// async function addEmployee() {
//     const { first_name, last_name, manager_option, role_option } = await
//         inquirer
//             .prompt([
//                 {
//                     type: "input",
//                     name: "first_name",
//                     message: "Please enter the first name of the employee you would like to add.",
//                     //makes answer required
//                     validate: firstNameInput => {
//                         if (firstNameInput) {
//                             return true;
//                         } else {
//                             console.log('You must enter the first name of the emloyee you would like to add before continuing.');
//                             return false;
//                         }
//                     }
//                 },
//                 {
//                     type: "input",
//                     name: "last_name",
//                     message: "Please enter the last name of the employee you would like to add.",
//                     //makes answer required
//                     validate: lastNameInput => {
//                         if (lastNameInput) {
//                             return true;
//                         } else {
//                             console.log('You must enter the last name of the emloyee you would like to add before continuing.');
//                             return false;
//                         }
//                     }
//                 },

//             ])
//     //query to INSERT INTO departments
// }



// async function choosePrompt() {
//     const { action } = await
//         inquirer
//             .prompt([
//                 {
//                     type: "list",
//                     name: "action",
//                     message: "Please select from the following actions:",
//                     choices: ['View Departments', 'Add Department', 'View Roles', 'Add Role', 'View Employees', 'Add Employee', 'Update Employee Role']
//                 }
//             ])
//     switch (action) {
//         case 'View Departments':
//             viewDepartments()
//             break;
//         case 'Add Department':
//             addDepartment()
//             break;
//         case 'View Roles':
//             break;
//         case 'Add Role':
//             addRole()
//             break;
//         case 'View Employees':
//             break;
//         case 'Add Employee':
//             break;
//         case 'Update Employee Role':
//             break;
//         default:
//     }



// }

// choosePrompt()