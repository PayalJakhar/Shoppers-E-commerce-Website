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
            <input type="text" name="type" placeholder="" required/>
        </div>

        <input type="number" name="amount" placeholder="Enter the no of clothes" required />
        <input type="number" name="amount" placeholder="Enter the no of clothes" required />

        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default Donation;
+