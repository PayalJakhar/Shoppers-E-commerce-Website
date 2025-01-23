import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from '.Pages/Shop';
import ShopCategory from '.Pages/ShopCategory';
import Product from '.Pages/Product';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
      <Navbar></Navbar>
      <Routes>
      <Route exact path='/' element={<Shop/>}></Route>
      <Route exact path='/mens' element={<ShopCategory category="men"/>}></Route>
      <Route exact path='/women' element={<ShopCategory category="women"/>}></Route>
      <Route exact path='/kids' element={<ShopCategory category="kid"/>}></Route>
      <Route exact path='/product' element={<Product/>}>
        <Route></Route>
      </Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
