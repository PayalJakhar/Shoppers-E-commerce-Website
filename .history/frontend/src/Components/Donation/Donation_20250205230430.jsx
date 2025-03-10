import React from 'react';
import './Donation.css';

const Donation = () => {
  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <input type="number" name="amount" placeholder="Enter Phone number" required />
        <p>Give details about the cloths you want to donate by clicking here</p>
        <button>ADD</button>
        <div>
            <input type="text" name="type" placeholder="Type" required/>
            <input type="text" name="quantity" placeholder="Quantity" required />
            <input type="text" name="damage" placeholder="Max Damage Percentage" required />
            <textarea name="description" rows="2" cols="30" placeholder="Enter description..."></textarea>
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default Donation;
