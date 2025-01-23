import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Route>
      <Navbar></Navbar>
      <Routes ></Routes>

      </Route>
    </div>
  );
}

export default App;
