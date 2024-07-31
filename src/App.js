import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import LoginPage from './components/LoginPage';
import CartComponent from './components/CartComponent';

function App() {
    return (
        <div> 
            <Router>
            <HeaderComponent />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/employee" element={<ListEmployeeComponent />} />
                        <Route path="/add-employee/:id" element={<CreateEmployeeComponent />} />
                        <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
                        <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
                        <Route path="/cart" element={<CartComponent />} />
                    </Routes>
                </div>
            </Router>
            <FooterComponent />
        </div>
    );
}

export default App;