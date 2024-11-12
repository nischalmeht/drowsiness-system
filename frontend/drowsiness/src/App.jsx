
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from './components/Login';
// import {Dashboard} from './components/Dashboard';
// import Driver from './components/Driverdashboard';
import { Fragment } from 'react';
import Driverdashboard from './components/driverDashboard';
import { Dashboard } from './components/Dashboard';


export const App=()=> {
  // return [<Nextflix key="1"/>, <Nextflix key="2"/>]
  return<Fragment>
   
    <Router>
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/driverdashboard" element={<Driverdashboard />} />
        <Route path="/" element={<Login />} />
       
      </Routes>
    </Router>
  </Fragment>
}


