import React, {useState} from 'react';
import './Donation.css';

const Donation = () => {
    const [divs, setDivs] = useState([]);

    const addDiv = () => {
        setDivs([
          ...divs,
          <div className="container-in" key={divs.length} style={{ display: 'block', marginBottom: '10px' }}>
            <input type="text" name="type" placeholder="Type" required />
            <input type="text" name="quantity" placeholder="Quantity" required />
            <input type="text" name="damage" placeholder="Damage Percentage" required />
            <textarea name="description" rows="1" cols="50" placeholder="Enter description..."></textarea>
            <button onClick={addDiv}>ADD</button>
          </div>,
        ]);
      };
  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <input type="number" name="amount" placeholder="Enter Phone number" required />
        <p>Give details about the cloths you want to donate by clicking here!!!</p>
        <div className="container-in">
            <input type="text" name="type" placeholder="Type" required/>
            <input type="text" name="quantity" placeholder="Quantity" required />
            <input type="text" name="damage" placeholder="Damage Percentage" required />
            <textarea name="description" rows="1" cols="50" placeholder="Enter description..."></textarea>
            <button onClick={addDiv}>ADD</button>
            {divs}
        </div>
        <button type="submit">Donate</button>
      </form>
    </div>
  );
};

export default Donation;
