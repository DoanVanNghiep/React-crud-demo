import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withHook from './withHook';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false, // Initialize with a default logged-in state
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin() {
        // Simulate a login process
        this.setState({ loggedIn: true });
        // Additional login logic can be added here
        this.props.navigation('/login');
    }

    handleLogout() {
        // Simulate a logout process
        this.setState({ loggedIn: false });
        // Additional logout logic can be added here (e.g., clearing tokens)
    }

    render() {
        const { loggedIn } = this.state;

        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div className="container-fluid">
                            <a href="/employee" className="navbar-brand">Employee Management App</a>
                            <a href="/cart" className="navbar-brand">cart</a>
                        </div>
                        
                    </nav>
                </header>
            </div>
        );
    }
}

export default withHook(HeaderComponent);