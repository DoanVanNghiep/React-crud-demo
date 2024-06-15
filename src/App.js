import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import CreateEmployeeComponent from './components/CreateEmployeeComponent';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';
// import HeaderComponent from './components/HeaderComponent';
// import FooterComponent from './components/FooterComponent';

function App() {
    return (
        <div>
            {/* <HeaderComponent /> */}
            <Router>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<ListEmployeeComponent />} />
                        <Route path="/employee" element={<ListEmployeeComponent />} />
                        <Route path="/add-employee/:id" element={<CreateEmployeeComponent />} />
                        <Route path="/update-employee/:id" element={<UpdateEmployeeComponent />} />
                        <Route path="/view-employee/:id" element={<ViewEmployeeComponent />} />
                    </Routes>
                </div>
            </Router>
            {/* <FooterComponent /> */}
        </div>
    );
}

export default App;