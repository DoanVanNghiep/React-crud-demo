import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import {
  BrowserRouter as Router,

} from 'react-router-dom';
import RouteApp from './RouteApp';
// import HeaderComponent from './component/HeaderComponent';
// import FooterComponent from './component/FooterComponent';

function App() {

  return (
    <div>
    
      <Router>
        <RouteApp />
      </Router>
      
    </div>
  );
}

export default App;