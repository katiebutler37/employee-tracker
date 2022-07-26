class Department {
    //should i also be getting id's here or no because its automatically assigned?
    constructor(department_id, department_name) {
        this.department_id = department_id;
        this.department_name = department_name;
    }
    getDepartmentName() {
       return this.department_name;
    }
    getDepartmentId() {
        return this.department_id;
    }
}
module.exports = Department;

