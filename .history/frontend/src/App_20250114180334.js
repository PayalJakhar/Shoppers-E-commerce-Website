import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <Router>
      <Navbar></Navbar>
      
      </Router>

    </div>
  );
}

export default App;
