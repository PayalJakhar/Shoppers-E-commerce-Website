import React, { useState } from "react";
import "./Donation.css";

const Donation = () => {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const addRow = () => {
    // e.preventDefault();
    setRows([...rows, { id: rows.length }]); // Unique ID for each row
  };

  const removeRow = (id) => {
    // e.preventDefault();
    setRows(rows.filter((row)=>{ return row.id!==id})); // Unique ID for each row
  };



  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input className="inpt" type="text" name="name" placeholder="Your Name" required />
        <input className="inpt" type="email" name="email" placeholder="Your Email" required />
        <input className="inpt" type="number" name="amount" placeholder="Enter Phone number" required />
        <p>Give details about the clothes you want to donate by clicking here!!!</p>

        <div className="container-in">
          <select className="inpt" name="type" required>
            <option value="">Select Type</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Shirt">Shirt</option>
            <option value="Jeans">Jeans</option>
            <option value="Trouser">Trouser</option>
          </select>
          <input className="inpt" type="text" name="quantity" placeholder="Quantity" required />
          <input className="inpt" type="text" name="damage" placeholder="Damage Percentage" required />
          <textarea name="description" rows="1" cols="50" placeholder="Enter description..."></textarea>
          <button className="btns" onClick={addRow}>ADD</button>
        </div>

        {rows.map((row) => (
          <div className="container-in" key={row.id}>
            <select className="inpt" name="type" required>
              <option value="">Select Type</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Shirt">Shirt</option>
              <option value="Jeans">Jeans</option>
              <option value="Trouser">Trouser</option>
            </select>
            <input className="inpt" type="text" name="quantity" placeholder="Quantity" required />
            <input className="inpt" type="text" name="damage" placeholder="Damage Percentage" required />
            <textarea name="description" rows="1" cols="50" placeholder="Enter description..."></textarea>
            <button className="btn" onClick={addRow} >ADD</button>
            <button className='btn' onClick={() => removeRow(row.id)} >X</button>
          </div>
        ))}

        {isOpen && (
                <div className="modals">
                <div className="modal-contents">
                    <span className="closes" onClick={closeModal}>&times;</span>
                    <h2>🌼 Donate & Earn Rewards! 🌼</h2>
                    <ul>
                    <li>✔ Support a Cause: Your donations go directly to trusted NGOs, making a real impact</li>
                    <li>✔ Minimum 5 Items: Donate at least 5 clothes to contribute</li>
                    <li>✔ Earn Rewards: Get 100 points per donation—stack up to 500 points to unlock exclusive discounts & coupons!</li>
                    <li>✔ Quality Matters: Clothes should have no more than 20% damage—let's keep it wearable for those in need!</li>
                    💙 Give. Earn. Save. Start donating today!
                    </ul>
                    <button className="donate-buttons" onClick={()=>{setValue('none');setIsOpen(false)}}>
                    <Link style={{ textDecoration: 'none', color:'white'}} to='/donation'>Donate Now</Link>
                    </button>
                </div>
                </div>
            )}

        <button className="btn" type="submit" onClick={open}>Proceed</button>
      </form>
    </div>
  );
};

export default Donation;
