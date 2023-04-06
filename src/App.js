import { Container } from 'react-bootstrap';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <div>
    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "50vw"}}>
      <div className='w-100' style={{maxWidth: "600px"}}>
      <AuthProvider>
      <Routes>
        <Route exact path='/' Component={Login}/>
        <Route exact path='/login' Component={Login}/>
        <Route exact path='/signup' Component={Signup}/>
      </Routes> 
      </AuthProvider>
      </div>
    </Container>
    </div>
  );
}

export default App;
