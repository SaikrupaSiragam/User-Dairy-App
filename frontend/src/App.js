import SingUpComponent from './components/SingUp';
import LoginComponent from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DairyComponent from './components/Dairy';
import UserCredentialsComponent from './components/UserCredentials';
import TabComponent from './components/Main';
import EditComponent from './components/EditEntry';
import EditCredentials from './components/EditCredentials';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/signup" element={<SingUpComponent />} />
            <Route path='/usercredentials/:userid' element={<UserCredentialsComponent/>}/>
            <Route path='/users/:userid' element={<DairyComponent/>}/>
            <Route path='/userdairy' element={<TabComponent/>}/>
            <Route path='/edit' element={<EditComponent/>}/>
            <Route path='/editcredentials' element={<EditCredentials/>}/>
            </Routes>
        </BrowserRouter>
     </div>
  );
}

export default App;
