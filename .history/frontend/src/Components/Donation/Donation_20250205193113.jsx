import React from 'react';
import './Donation.css';

const Donation = () => {
  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <input type="number" name="amount" placeholder="" required />
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default Donation;
