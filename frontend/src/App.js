import './App.css';
import SingUpComponent from './components/SingUp';
import LoginComponent from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DairyComponent from './components/Dairy';
import UserCredentialsComponent from './components/UserCredentials';
import NewComponent from './components/NewComponent';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SingUpComponent />} />
            <Route path='/usercredentials/:userid' element={<UserCredentialsComponent/>}/>
            <Route path='/users/:userid' element={<DairyComponent/>}/>
            <Route path='/userdairy' element={<NewComponent/>}/>
            </Routes>
        </BrowserRouter>
     </div>
  );
}

export default App;
