import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import withHook from './withHook';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      message: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/check-login', {
        username: this.state.username,
        password: this.state.password
      });
      if (response.status === 200) {
        // Đăng nhập thành công, điều hướng đến trang ListEmployee
        this.props.navigation('/');
      } else {
        this.setState({ message: 'Invalid username or password' });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.setState({ message: 'Invalid username or password' });
      } else {
        this.setState({ message: 'An error occurred' });
      }
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
        {this.state.message && <p>{this.state.message}</p>}
      </form>
    );
  }
}

export default withHook(LoginForm);