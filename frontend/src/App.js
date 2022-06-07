import SingUpComponent from './components/SingUp';
import LoginComponent from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DairyComponent from './components/Dairy';
import UserCredentialsComponent from './components/UserCredentials';
import TabComponent from './components/Main';
import EditComponent from './components/Edit';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<SingUpComponent />} />
            <Route path='/usercredentials/:userid' element={<UserCredentialsComponent/>}/>
            <Route path='/users/:userid' element={<DairyComponent/>}/>
            <Route path='/userdairy' element={<TabComponent/>}/>
            <Route path='/edit' element={<EditComponent/>}/>
            </Routes>
        </BrowserRouter>
     </div>
  );
}

export default App;
