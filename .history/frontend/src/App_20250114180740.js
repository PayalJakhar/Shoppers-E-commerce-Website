import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
      <Navbar></Navbar>
      <Routes>
      <Route exact path='/'></Route>

      </Routes>
      </Router>
    </div>
  );
}

export default App;
