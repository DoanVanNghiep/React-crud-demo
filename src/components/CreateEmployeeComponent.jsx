import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: "_add",
            empNo: '',
            empName: '',
            position: '',
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdateEmployee = this.saveOrUpdateEmployee.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.empNo).then((res) => {
                let employee = res.data;
                this.setState({
                    empNo: employee.empNo,
                    empName: employee.empName,
                    position: employee.position
                });
            });
        }
    }
    saveOrUpdateEmployee = (e) => {
        e.preventDefault();
        let employee = { empNo: this.state.empNo, empName: this.state.empName, position: this.state.position };
        console.log('employee => ' + JSON.stringify(employee));



        // step 5
        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(res => {
                window.location.href = '/employee';
            });
        } else {
            EmployeeService.updateEmployee(employee, this.state.empNo).then(res => {
                window.location.href = '/employee';
            });
        }
    }

    changeFirstNameHandler = (event) => {
        this.setState({ empNo: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ empName: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ position: event.target.value });
    }

    cancel(e) {
        e.preventDefault()
        window.location.href = '/employee';
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Employee No: </label>
                                        <input placeholder="Employee No" name="empNo" className="form-control" value={this.state.empNo} onChange={this.changeFirstNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Employee Name: </label>
                                        <input placeholder="Employee Name" name="empName" className="form-control"
                                            value={this.state.empName} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Position: </label>
                                        <input placeholder="Employee Position" name="position" className="form-control"
                                            value={this.state.position} onChange={this.changeEmailHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateEmployee}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent