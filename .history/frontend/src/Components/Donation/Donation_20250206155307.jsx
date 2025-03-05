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

  const NGOs = [
    { name: "Red Cross", url: "https://www.redcross.org" },
    { name: "UNICEF", url: "https://www.unicef.org" },
    { name: "Save the Children", url: "https://www.savethechildren.net" },
    { name: "Charity: Water", url: "https://www.charitywater.org" },
  ];

  const [selectedNGO, setSelectedNGO] = useState(null);

  const handleNGOClick = (ngoUrl) => {
    window.open(ngoUrl, "_blank");
  };

  const handleChange =(e)=>{
    values=e.target.value;
  }

  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input className="inpt" type="text" name="name" placeholder="Your Name" required />
        <input className="inpt" type="email" name="email" placeholder="Your Email" required />
        <input className="inpt" type="number" name="amount" placeholder="Enter Phone number" required />
        <input className="inpt" type="text" name="address" placeholder="Your Address" required />
        <input className="inpt" type="text" name="city" placeholder="Your City" required />
        <input className="inpt" type="text" name="pincode" placeholder="Your Pincode" required />
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
            <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={close}>&times;</span>
                <h2>Preferred NGOs</h2>
                <label>Select An Option</label>
                <div className="ngo-list" >
                    {NGOs.map((ngo, index) => (
                        <select value={values} onChange={handleChange}>
                            <label key={index} className="ngo-option">
                            <input
                                type="checkbox"
                                checked={selectedNGO === ngo.url}
                                onChange={() => setSelectedNGO(ngo.url)}
                            />
                            <span onClick={() => handleNGOClick(ngo.url)}>{ngo.name}</span>
                            </label>
                        </select>
                    ))}


                </div>
                <button className="donate-button">Donate Now
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
