import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/'

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Shop/>} />
          <Route exact path="/mens" element={<ShopCategory category="men" />} />
          <Route exact path="/women" element={<ShopCategory category="women" />} />
          <Route exact path="/kids" element={<ShopCategory category="kid" />} />
          <Route exact path="/product/:productID" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
