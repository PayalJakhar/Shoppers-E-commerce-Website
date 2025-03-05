import React, { useState } from 'react';
import './Donate.css';

const Donate = () => {
  const [value, vanish] = useState('flex'); 

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <>
    <div className='donate' style={{ display: value }}>
      <p>💜 Make a Difference Today! 💜 Your support matters—click to donate and spread kindness!</p>
      <div className='donate-in'>
        <button className='para' onClick={openModal}>Donate</button>

        {isOpen && (
            <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>🌼 Spread Love, Share Clothes! 🌼</h2>
                <p>Your old clothes can bring joy to those in need. Please consider donating to our partner NGO!</p>
                <a href="donation-link.html" className="donate-button">Donate Now</a>
            </div>
            </div>
        )}

        <button className='text' onClick={()=> vanish('none')}>X</button>
      </div>
    </div>
  );
}

export default Donate;
