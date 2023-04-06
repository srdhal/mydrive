import { Container } from 'react-bootstrap';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Dashboard from './components/Dashboard';
import PrivateRoute from './privateroutes/PrivateRoute';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <div>
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "50vw"}}>
      <div className='w-100' style={{maxWidth: "600px"}}>
      <AuthProvider>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route path='/login' Component={Login}/>
        <Route path='/signup' Component={Signup}/>
        <Route path='/forgotpassword' Component={ForgotPassword}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      </Routes> 
      </AuthProvider>
      </div>
    </Container>
    </div>
  );
}

export default App;
