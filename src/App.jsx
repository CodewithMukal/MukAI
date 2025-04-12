import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AI from './AI';
import SignUp from './Signup';
import { Login } from './Login';
import { Home } from './Home';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <Router>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<AI/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>} />
      </Routes>
    </Router>
  );
}

export default App;