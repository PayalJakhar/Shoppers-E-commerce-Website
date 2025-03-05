import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContext';
// import { DonationProvider } from './Context/DonationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ShopContextProvider>
    <DonationProvider>
      <App />
    </DonationProvider>
    </ShopContextProvider>
  </React.StrictMode>
);

reportWebVitals();
