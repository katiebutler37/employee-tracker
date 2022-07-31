const db = require('../db/connection')

class Database {
    //member variable (property of a class)
    connection;
    constructor() {
        this.connection = db;
    }
    async getDepartments() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT department_name, department_id FROM departments", (err, result) => {
                if (err) throw err;
                resolve({ departments: result });
            })
        })
    }
    async getDepartmentNames() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT department_name FROM departments", (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((department) => {
                    // department => { department_name: "Sales" }
                    newResult.push(department.department_name); // "Sales"
                });

                resolve({departmentNames: newResult });
                // [ 'Sales', 'Engineering', 'Finance', 'Legal' ]
            })
        })
    }
    async getRoles() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT roles.title, roles.role_id, departments.department_name, roles.salary FROM roles LEFT JOIN departments ON departments.department_id = roles.department_id;", (err, result) => {
                if (err) throw err;
                resolve({ roles: result });
            })
        })
    }
    async addRole() {

    }
    async getEmployees() {
        return new Promise ((resolve, reject) => {
            db.query(`
            ALTER TABLE employees ADD COLUMN manager_name VARCHAR(100);
            UPDATE employees SET manager_name = CONCAT(first_name, ' ', last_name)
            WHERE employee_id = manager_id;
            SELECT employees.employee_id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, employees.manager  
            FROM employees 
            JOIN roles 
            ON roles.role_id = employees.role_id
            JOIN departments
            ON departments.department_id = roles.department_id;`, (err, result) => {
                if (err) throw err;
                resolve({ employees: result });
            })
        })
    }
    async addEmployee() {
        
    }
}


async function departments() {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM departments", (err, result) => {
            if (err) throw err;
            resolve({ departments: result });
        })
    });
}

(async () => {
    const myDatabase = new Database();
    const { departments } = await db.viewDepartments();
    console.log("departments result", departments);
})


module.exports = Database;