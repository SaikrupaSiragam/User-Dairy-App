import './App.css';
import SingUpComponent from './components/SingUp';
import LoginComponent from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DairyComponent from './components/Dairy';
import CreateNoteComponent from './components/CreateNote';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SingUpComponent />} />
            <Route path='/users/:userid' element={<DairyComponent/>}/>
            <Route path='/addEntry' element={<CreateNoteComponent/>}/>
          </Routes>
        </BrowserRouter>
     </div>
  );
}

export default App;
