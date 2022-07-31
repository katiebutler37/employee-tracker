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
    async viewRoles() {

    }
    async addRole() {

    }
    async viewEmployees() {

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