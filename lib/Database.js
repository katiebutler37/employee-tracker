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

    async getRoleNames() {
        return new Promise ((resolve, reject) => {
            db.query("SELECT title FROM roles", (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((role) => {
                    // role => { title: "Sales Lead" }
                    newResult.push(role.title); // "Sales Lead"
                });

                resolve({roleNames: newResult });
                // [ 'Sales Lead', 'Engineer' ]
            })
        })
    }

    async getEmployeeNames() {
        return new Promise ((resolve, reject) => {
            db.query(`
            SELECT CONCAT(first_name, ' ', last_name) AS name
            FROM employees;`, (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((employee) => {
                // role => { title: "Sales Lead" }
                    newResult.push(employee.name); // "Sales Lead"
                });

                resolve({employeeNames: newResult });
                // [ 'Sales Lead', 'Engineer' ]
            })
        })
    }

    async getManagerNames() {
        return new Promise ((resolve, reject) => {
            db.query(`
            SELECT CONCAT(first_name, ' ', last_name) AS name
            FROM employees WHERE manager_id IS NULL;`, (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((manager) => {
                    // role => { title: "Sales Lead" }
                    newResult.push(manager.name); // "Sales Lead"
                });

                resolve({managerNames: newResult });
                // [ 'Sales Lead', 'Engineer' ]
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
                resolve({ departmentId: newResult });
            })
        })
    }

    async getRoleId(role_option) {
        const params = [role_option];
        return new Promise ((resolve, reject) => {
            db.query("SELECT id FROM roles WHERE title = ?;", params, (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((role) => {
                    // role => { id: "5" }
                    newResult.push(role.id); // "5"
                });
                resolve({ roleId: newResult });
            })
        })
    }

    async getEmployeeId(employee_option) {
        const params = [employee_option];
        return new Promise ((resolve, reject) => {
            db.query(`
            SELECT id 
            FROM employees 
            WHERE CONCAT(first_name, ' ', last_name) = ?;`, params, (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((employee) => {
                    // role => { id: "5" }
                    newResult.push(employee.id); // "5"
                });
                resolve({ employeeId: newResult });
            })
        })
    }

    async addRoleQuery(title, salary, departmentId) {
        return new Promise ((resolve, reject) => {
            const params = [title, salary, departmentId];
            db.query(`
            INSERT INTO roles (title, salary, department_id)
            VALUE (?,?,?)`, params, (err, result) => {
                if (err) throw err;
                resolve();
            })
        })
    }

    async addEmployeeQuery(first_name, last_name, roleId) {
        return new Promise ((resolve, reject) => {
            const params = [first_name, last_name, roleId];
            db.query(`
            INSERT INTO employees (first_name, last_name, role_id)
            VALUE (?,?,?)`, params, (err, result) => {
                if (err) throw err;
                resolve();
            })
        })
    }

    async getLastEmployee() {
        return new Promise ((resolve, reject) => {
            db.query(`
            SELECT id 
            FROM employees 
            ORDER BY ID DESC LIMIT 1`, (err, result) => {
                if (err) throw err;
                let newResult = [];

                result.forEach((employee) => {
                    // role => { id: "5" }
                    newResult.push(employee.id); // "5"
                });
                resolve({ lastId: newResult });
            })
        })
    }

    async addEmployeeManagerQuery(employeeId, lastId) {
        return new Promise ((resolve, reject) => {
            const params = [employeeId, lastId];
            db.query(`
            UPDATE employees 
            SET manager_id = ?
            WHERE id = ?;`, params, (err, result) => {
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

    async updateEmployeeRoleQuery(roleId, employeeId) {
        return new Promise ((resolve, reject) => {
            const params = [roleId, employeeId]
            db.query(`
            UPDATE employees
            SET role_id = ?
            WHERE id = ?;`, params, (err, result) => {
                if (err) throw err;
                resolve({ updatedEmployee: result });
            })
        })
    }

    async getEmployeesByManager(employeeId) {
        return new Promise ((resolve, reject) => {
            const params = [employeeId]
            db.query(`
            SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary 
            FROM employees 
            LEFT JOIN roles 
            ON roles.id = employees.role_id
            LEFT JOIN departments
            ON departments.id = roles.department_id
            WHERE employees.manager_id = ?;`, params, (err, result) => {
                if (err) throw err;
                resolve({ employeesByManager: result });
            })
        })
    }
}

module.exports = Database;