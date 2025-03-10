import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from '.Pages/Shop';
import ShopCategory from '.Pages/ShopCategory';
import Product from '.Pages/Product';
import Cart from '.Pages/Cart';
import LoginSignup from '.Pages/Lo';
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
        <Route exact path=':productID' element={<Product/>}></Route>
      </Route>
      <Route exact path='/cart' element={<Cart/>}></Route>
      <Route exact path='/Login' element={<LoginSignup/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
