import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Shop />} />
          <Route exact path="/mens" element={<ShopCategory category="men" />} />
          <Route exact path="/women" element={<ShopCategory category="women" />} />
          <Route exact path="/kids" element={<ShopCategory category="kid" />} />
          <Route exact path="/product" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<LoginSignup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
