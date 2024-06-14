import React, { Component } from 'react'
import EmployeeService from '../service/EmployeeService'
import { NavLink, useNavigation } from 'react-router-dom';
import withHook from '../components/withHook';

class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        }
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }


    deleteEmployee(id) {
        console.log("id: ", id);
        this.state.employees.filter(employee => {
            console.log("employee.id !== id: ", employee.id !== id)
            return employee.id !== id;
        })
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.id !== id) });
        });
    }
    viewEmployee(id) {
        this.props.navigation(`/view-employee/${id}`);
    }
    editEmployee(id) {
        window.location.href = `/add-employee/${id}`;
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employees List</h2>
                <div className="row">
                    <NavLink to={'/add-employee/_add'} className="btn btn-primary"> Add Employee</NavLink>
                </div>
                <br></br>
                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th> Employee No</th>
                                <th> Employee Name</th>
                                <th> Employee Position</th>
                                <th> Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.empNo}>
                                            <td> {employee.empNo} </td>
                                            <td> {employee.empName} </td>
                                            <td> {employee.position}</td>
                                            <td>
                                                <NavLink to={'/add-employee/_add'} className="btn btn-info">Update</NavLink>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.deleteEmployee(employee.empNo)} className="btn btn-danger">Delete </button>
                                                <button style={{ marginLeft: "10px" }} onClick={() => this.viewEmployee(employee.empNo)} className="btn btn-info">View </button>
                                            </td>
                                            </tr>
                                )
                            }
                        </tbody>
                    </table>

                </div>

            </div>
        )
    }
}

export default withHook(ListEmployeeComponent); 