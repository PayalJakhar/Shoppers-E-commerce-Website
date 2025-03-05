import React, { useState } from 'react';
import './Donate.css';

const Donate = () => {
  const [value, vanish] = useState('flex'); 

  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    vanish('none');
  };

  const closeModal = () => {
    setIsOpen(false);
    vanish('flex');
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
                    <li>✔ Support a Cause: Your donations go directly to trusted NGOs, making a real impact</li>
                    <li>✔ Minimum 5 Items: Donate at least 5 clothes to contribute</li>
                    <li>✔ Earn Rewards: Get 100 points per donation—stack up to 500 points to unlock exclusive discounts & coupons!</li>
                    <li>✔ Quality Matters: Clothes should have no more than 20% damage—let's keep it wearable for those in need!</li>
                    💙 Give. Earn. Save. Start donating today!
                </ul>
                <button className="donate-button" on>Donate Now</button>
            </div>
            </div>
        )}
    </>
  );
}

export default Donate;
