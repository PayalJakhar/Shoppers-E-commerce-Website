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
        <button className='text' onClick={()=> vanish('none')}>X</button>
      </div>
    </div>
    {isOpen && (
            <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>🌼 Donate & Earn Rewards! 🌼</h2>
                <ul>
                    <li>✔ Support a Cause: Your donations go directly to trusted NGOs, making a real impact.</li>✔ Support a Cause: Your donations go directly to trusted NGOs, making a real impact.<br/>
                ✔ Minimum 5 Items: Donate at least 5 clothes to contribute.<br/>
                ✔ Earn Rewards: Get 100 points per donation—stack up to 500 points to unlock exclusive discounts & coupons!<br/>
                ✔ Quality Matters: Clothes should have no more than 20% damage—let’s keep it wearable for those in need!<br/>
                <br/>
                💙 Give. Earn. Save. Start donating today!
                </ul>
                <a href="donation-link.html" className="donate-button">Donate Now</a>
            </div>
            </div>
        )}
    </>
  );
}

export default Donate;
