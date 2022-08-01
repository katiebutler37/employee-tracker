const db = require('../db/connection')

class Database {
    //member variable (property of a class)
    connection;
    constructor() {
        this.connection = db;
    }
    async getDepartments() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT name, id FROM departments", (err, result) => {
                if (err) throw err;
                resolve({ departments: result });
            })
        })
    }
    async getDepartmentNames() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT name FROM departments", (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((department) => {
                    // department => { department_name: "Sales" }
                    newResult.push(department.name); // "Sales"
                });

                resolve({departmentNames: newResult });
                // [ 'Sales', 'Engineering', 'Finance', 'Legal' ]
            })
        })
    }

    async addDepartmentQuery(name) {
        return new Promise ((resolve, reject) => {
            const params = [name];
            db.query(`
            INSERT INTO departments (name)
            VALUE (?)`, params, (err, result) => {
            
                if (err) throw err;
                resolve();
            })
        })
    }

    async getRoles() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT roles.title, roles.id, departments.name AS department, roles.salary FROM roles LEFT JOIN departments ON departments.id = roles.department_id;", (err, result) => {
                if (err) throw err;
                resolve({ roles: result });
            })
        })
    }

    async getDepartmentId(department_option) {
        const params = [department_option];
        return new Promise ((resolve, reject) => {
            db.query("SELECT id FROM departments WHERE name = ?;", params, (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((department) => {
                    // department => { id: "5" }
                    newResult.push(department.id); // "5"
                });
                resolve({ department_id: newResult });
            })
        })
    }

    async addRoleQuery(title, salary, department_id) {
        return new Promise ((resolve, reject) => {
            const params = [title, salary, department_id];
            db.query(`
            INSERT INTO roles (title, salary, department_id)
            VALUE (?,?,?)`, params, (err, result) => {
                if (err) throw err;
                resolve();
            })
        })
    }
    async getEmployees() {
        return new Promise ((resolve, reject) => {
            db.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
            FROM employees 
            LEFT JOIN roles 
            ON roles.id = employees.role_id
            LEFT JOIN departments
            ON departments.id = roles.department_id
            LEFT JOIN employees manager 
            ON manager.id = employees.manager_id;`, (err, result) => {
                if (err) throw err;
                resolve({ employees: result });
            })
        })
    }

    async getEmployeesByManager() {
        return new Promise ((resolve, reject) => {
            db.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, employees.manager  
            FROM employees 
            LEFT JOIN roles 
            ON roles.id = employees.role_id
            LEFT JOIN departments
            ON departments.id = roles.department_id
            WHERE employees.manager_id = ?;`, (err, result) => {
                if (err) throw err;
                resolve({ employeesByManager: result });
            })
        })
    }

    async addEmployee() {
        
    }
}


// async function departments() {
//     return new Promise((resolve, reject) => {
//         db.query("SELECT * FROM departments", (err, result) => {
//             if (err) throw err;
//             resolve({ departments: result });
//         })
//     });
// }

// (async () => {
//     const myDatabase = new Database();
//     const { departments } = await db.viewDepartments();
//     console.log("departments result", departments);
// })


module.exports = Database;