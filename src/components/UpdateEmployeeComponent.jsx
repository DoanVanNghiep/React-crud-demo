import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.params.id,
            empNo: '',
            empName: '',
            position: ''
        };

        this.changeEmployeeNoHandler = this.changeEmployeeNoHandler.bind(this);
        this.changeEmployeeNameHandler = this.changeEmployeeNameHandler.bind(this);
        this.changePositionHandler = this.changePositionHandler.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            let employee = res.data;
            this.setState({
                empNo: employee.empNo,
                empName: employee.empName,
                position: employee.position
            });
        }).catch(error => {
            console.error('Error fetching employee:', error);
            alert('Could not retrieve employee data. Please try again later.');
        });
    }

    updateEmployee(e) {
        e.preventDefault();
        let employee = {
            empNo: this.state.empNo,
            empName: this.state.empName,
            position: this.state.position
        };

        console.log('Updating employee data:', employee);

        EmployeeService.updateEmployee(employee).then(res => {
            console.log('Employee updated successfully:', res.data);
            this.props.navigation('/employee');
        }).catch(error => {
            console.error('Error updating employee:', error);

            if (error.isAxiosError) {
                if (!error.response) {
                    console.error('No response received from server:', error.message);
                    alert('No response received from server. Please check your server and try again.');
                } else {
                    console.error('Axios error response:', error.response.data);
                    alert('Error updating employee: ' + (error.response.data.message || 'Please check the input data and try again.'));
                }
            } else {
                console.error('Unexpected error:', error.message);
                alert('An unexpected error occurred. Please try again later.');
            }
        });
    }

    changeEmployeeNoHandler(event) {
        this.setState({ empNo: event.target.value });
    }

    changeEmployeeNameHandler(event) {
        this.setState({ empName: event.target.value });
    }

    changePositionHandler(event) {
        this.setState({ position: event.target.value });
    }

    cancel() {
        this.props.navigation('/employee');
    }

    render() {
        return (
            <div>
                <br />
                <div className="container">
                <div className="row">
                        <div className="card col-md-6 offset-md-3">
                            <h3 className="text-center">Update Employee</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Employee No:</label>
                                        <input
                                            placeholder="Employee No"
                                            name="empNo"
                                            className="form-control"
                                            value={this.state.empNo}
                                            onChange={this.changeEmployeeNoHandler}
                                            readOnly
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Employee Name:</label>
                                        <input
                                            placeholder="Employee Name"
                                            name="empName"
                                            className="form-control"
                                            value={this.state.empName}
                                            onChange={this.changeEmployeeNameHandler}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Position:</label>
                                        <input
                                            placeholder="Position"
                                            name="position"
                                            className="form-control"
                                            value={this.state.position}
                                            onChange={this.changePositionHandler}
                                        />
                                    </div>

                                    <button className="btn btn-success" onClick={this.updateEmployee}>Update</button>
                                    <button className="btn btn-danger" onClick={this.cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(UpdateEmployeeComponent);