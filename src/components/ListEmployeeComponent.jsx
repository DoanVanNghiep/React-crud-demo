// ListEmployeeComponent.js
import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';
import AuthService from '../services/AuthService';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        };
        this.viewEmployee = this.viewEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
    }

    componentDidMount() {
        this.loadEmployees();
    }

    loadEmployees() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    viewEmployee(id) {
        this.props.navigation(`/view-employee/${id}`);
    }

    updateEmployee(id) {
        this.props.navigation(`/update-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(() => {
            this.setState({ employees: this.state.employees.filter(employee => employee.empNo !== id) });
        });
    }

    addEmployee() {
        this.props.navigation('/add-employee/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Employee ID</th>
                                <th>Image</th>
                                <th>Employee Name</th>
                                <th>Position</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map(employee =>
                                <tr key={employee.empNo}>
                                    <td>{employee.empNo}</td>
                                    <td><img alt="" src={employee.image} style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{employee.empName}</td>
                                    <td>{employee.position}</td>
                                    <td>
                                        <button onClick={() => this.updateEmployee(employee.empNo)} className="btn btn-info">Update</button>
                                        <button onClick={() => this.deleteEmployee(employee.empNo)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Delete</button>
                                        <button onClick={() => this.viewEmployee(employee.empNo)} className="btn btn-info" style={{ marginLeft: "10px" }}>View</button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default withHook(ListEmployeeComponent);
