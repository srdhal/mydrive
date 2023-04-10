import { Container } from 'react-bootstrap';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import PrivateRoute from './privateroutes/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';

function App() {
  return (
    <div>
    
      <AuthProvider>
      <Routes>
        {/* <Route exact path='/' Component={Login}/> */}
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/forgotpassword' Component={ForgotPassword}/>
        <Route path='/' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
        <Route path='/folder/:folderId' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes> 
      </AuthProvider>
     
    </div>
  );
}

export default App;
