import './App.css';
import Navbar from './Components/Navbar/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
      <Navbar></Navbar>
      <Routes>
      <Route exact path='/' element={<Shop/>}></Route>
      <Route exact path='/mens' element={<Shop/>}></Route>
      <Route exact path='/' element={<Shop/>}></Route>
      <Route exact path='/' element={<Shop/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
