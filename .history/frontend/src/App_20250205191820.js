import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import LoginSignup from './Pages/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './Components/Footer/Footer'
import men_banner from './Components/Assets/Frontend_Assets/banner_mens.png'
import women_banner from './Components/Assets/Frontend_Assets/banner_women.png'
import kid_banner from './Components/Assets/Frontend_Assets/banner_kids.png'
import Donate from './Components/Donate/Donate';
function App() {
  
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Shop/>} />
          <Route exact path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route exact path="/women" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route exact path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route exact path="/product/:productID" element={<Product />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/login" element={<LoginSignup />} />
          <Route exact path='/do'
        </Routes>
        <Footer/>
        <Donate/>
      </Router>
    </div>
  );
}

export default App;
