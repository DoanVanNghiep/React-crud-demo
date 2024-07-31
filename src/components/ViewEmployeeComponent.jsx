import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';
import withHook from '../components/withHook';
import AuthService from '../services/AuthService';

class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.params.id,
            employee: {}
        };
        this.addToCart = this.addToCart.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({ employee: res.data });
        });
    }

    addToCart() {
        let cart = AuthService.loadCart();
        const existingEmployee = cart.find(item => item.empNo === this.state.employee.empNo);
        if (existingEmployee) {
            cart = cart.map(item =>
                item.empNo === this.state.employee.empNo
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            cart.push({ ...this.state.employee, quantity: 1 });
        }
        AuthService.saveCart(cart);
        alert('Da them vao gio hang.!');
    }

    render() {
        return (
            <div>
                <br />
                <div className="card col-md-6 offset-md-3">
                    <h3 className="text-center">View Employee Details</h3>
                    <div className="card-body">
                        <div className="row">
                            <label>Employee ID:</label>
                            <div>{this.state.employee.empNo}</div>
                        </div>
                        <div className="row">
                            <label>Employee Image: </label>
                            <div><img id="employeeImage" alt="Employee Image" src={this.state.employee.image} style={{ width: '50px', height: '50px' }}/> </div>
                        </div>
                        <div className="row">
                            <label>Employee Name:</label>
                            <div>{this.state.employee.empName}</div>
                        </div>
                        <div className="row">
                            <label>Employee Position:</label>
                            <div>{this.state.employee.position}</div>
                        </div>
                        <div><button className="btn btn-primary" onClick={this.addToCart}>Add to Cart</button></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withHook(ViewEmployeeComponent);