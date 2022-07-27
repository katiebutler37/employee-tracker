class Employee {
    constructor (first_name, last_name, manager_id, role_id, department_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.manager_id = manager_id;
        this.role_id = role_id;
        this.department_id = department_id;
    }
    // getFirstName () {
    //     return this.first_name;
    // }
    // getLastName () {
    //     return this.last_name;
    // }
    // getManagerId () {
    //     return this.manager_id;
    // }
}
module.exports = Employee;

