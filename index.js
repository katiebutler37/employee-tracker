const inquirer = require("inquirer");
const db = require("./db/connection");
const table = require("console.table");
const myDatabase = require('./lib/Database')
const connection = new myDatabase();

const viewDepartments = async () => {
  const { departments } = await connection.getDepartments();
  console.table(departments);
  choosePrompt();
};

const viewRoles = async () => {
  const { roles } = await connection.getRoles();
  console.table(roles);
  choosePrompt();
};

const viewEmployees = async () => {
  const { employees } = await connection.getEmployees();
  console.table(employees);
  choosePrompt();
};

async function addDepartment() {
  const { name } = await
    inquirer.prompt([
      {
        type: "input",
        name: "name",
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
      }
    ]);
  //query to INSERT INTO departments
  connection.addDepartmentQuery(name);
  //back to main menu
  choosePrompt();
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
              "You must enter the title of the role you would like to add before continuing.");
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
      }
    ]);
  //use await if receiving data from database, dont use if sending to db
  const { departmentId } = await connection.getDepartmentId(department_option);
  //query to INSERT INTO departments
  connection.addRoleQuery(title, salary, departmentId);
  //back to main menu
  choosePrompt();
}
async function addEmployee() {

  const { roleNames } = await connection.getRoleNames();

  const { first_name, last_name, role_option, confirmManager } = await
    inquirer.prompt([
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
              "You must enter the first name of the employee you would like to add before continuing."
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
      {
        type: "list",
        name: "role_option",
        message: "Please select the role of your new employee.",
        choices: roleNames
      },
      {
        type: "confirm",
        name: "confirmManager",
        message: "Does this employee report to a manager?",
        default: false
      }
    ]);

  const { roleId } = await connection.getRoleId(role_option);
   //query to INSERT INTO db
   connection.addEmployeeQuery(first_name, last_name, roleId);
  if (confirmManager) {
    addEmployeeManager();
  }
  else {
    choosePrompt();
  }
}

async function addEmployeeManager() {

  const { employeeNames } = await connection.getEmployeeNames();

  const { employee_option } = await
    inquirer.prompt([
      {
        type: "list",
        name: "employee_option",
        message: "Please select the name of the manager your new employee reports to.",
        choices: employeeNames
      }
    ])
  const { employeeId } = await connection.getEmployeeId(employee_option);
  const { lastId } = await connection.getLastEmployee();
  //query to INSERT INTO departments
  connection.addEmployeeManagerQuery(employeeId, lastId);
  choosePrompt();
}

async function updateEmployee() {

  const { employeeNames } = await connection.getEmployeeNames();
  const { roleNames } = await connection.getRoleNames();

  const { employee_option, role_option } = await
    inquirer.prompt([
      {
        type: "list",
        name: "employee_option",
        message: "Please select the name of the employee you would like to update.",
        choices: employeeNames
      },
      {
        type: "list",
        name: "role_option",
        message: "Please select the updated role of this employee.",
        choices: roleNames
      }
    ])
    const { roleId } = await connection.getRoleId(role_option);
    const { employeeId } = await connection.getEmployeeId(employee_option);
    connection.updateEmployeeRoleQuery(roleId, employeeId);
    choosePrompt();
}

async function viewEmployeesbyManager(){

  const { managerNames } = await connection.getManagerNames();

  const { manager_option } = await
  inquirer.prompt([
    {
      type: "list",
      name: "manager_option",
      message: "Please select the name of the manager to view the employees they oversee.",
      choices: managerNames
    }
  ])
  const { employeeId } = await connection.getEmployeeId(manager_option);
  const { employeesByManager } = await connection.getEmployeesByManager(employeeId);
  console.table(employeesByManager);
  choosePrompt();
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
        "View Employees by Manager"
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
      await viewEmployees();
      break;
    case "Add Employee":
      await addEmployee();
      break;
    case "Update Employee Role":
      await updateEmployee();
      break;
    case "View Employees by Manager":
      await viewEmployeesbyManager();
      break;  
    default: return;
  }
}
//start off in main menu
choosePrompt();
