import axios from "axios"

const REACT_APP_BACKEND_URL = "http://localhost:8080/employees"

class EmployeeService {

    getEmployees() {
        return axios.get(REACT_APP_BACKEND_URL);
    }

    createEmployee(employee) {
        return axios.post(REACT_APP_BACKEND_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(REACT_APP_BACKEND_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(REACT_APP_BACKEND_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(REACT_APP_BACKEND_URL + '/' + employeeId);
    }
}

export default new EmployeeService()