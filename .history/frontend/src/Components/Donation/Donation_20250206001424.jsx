// import React, { useState } from 'react';
// import './Donation.css';

// const Donation = () => {
//   const [divs, setDivs] = useState([]);

//   const addDiv = (e) => {
//     e.preventDefault();  // Prevent form submission on clicking "ADD"
//     setDivs([
//       ...divs,
//       <div className="container-in" key={divs.length}>
//         <input className="inpt" type="text" name="type" placeholder="Type" required />
//         <input className="inpt" type="text" name="quantity" placeholder="Quantity" required />
//         <input className="inpt" type="text" name="damage" placeholder="Damage Percentage" required />
//         <textarea name="description" rows="1" cols="50" placeholder="Enter description..."></textarea>
//         <button className="btn" onClick={addDiv}>ADD</button>
//       </div>,
//     ]);
//   };

//   return (
//     <div className="container">
//       <h1>Donate Now</h1>
//       <form action="/submit-donation" method="post">
//         <input className="inpt" type="text" name="name" placeholder="Your Name" required />
//         <input className="inpt" type="email" name="email" placeholder="Your Email" required />
//         <input className="inpt" type="number" name="amount" placeholder="Enter Phone number" required />
//         <p>Give details about the clothes you want to donate by clicking here!!!</p>

//         <div className="container-in">
//           <input className="inpt" type="text" name="type" placeholder="Type" required />
//           <input className="inpt" type="text" name="quantity" placeholder="Quantity" required />
//           <input className="inpt" type="text" name="damage" placeholder="Damage Percentage" required />
//           <textarea name="description" rows="1" cols="50" placeholder="Enter description..."></textarea>
//           <button className="btn" onClick={addDiv}>ADD</button>
//         </div>
        
//         {divs}

//         <button className="btn" type="submit">Donate</button>
//       </form>
//     </div>
//   );
// };

// export default Donation;


// import React from 'react'
import './Donation.css'
// import Donate from '../Components/Donate/Donate'
import React, { useState } from 'react';

const ClothingForm = () => {
  const [clothesDetails, setClothesDetails] = useState([
    { type: '', quantity: '', damagePercent: '' },
  ]);

  const handleClothesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedClothes = [...clothesDetails];
    updatedClothes[index][name] = value;
    setClothesDetails(updatedClothes);
  };

  const handleAddClothes = () => {
    setClothesDetails([...clothesDetails, { type: '', quantity: '', damagePercent: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', clothesDetails);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNo" />
        </div>

        <div className="clothes-details-section">
          <h3>Give Details of Clothes</h3>
          {clothesDetails.map((clothes, index) => (
            <div key={index} className="clothes-details">
              <div className="clothes-item">
                <label>Type:</label>
                <select
                  name="type"
                  value={clothes.type}
                  onChange={(e) => handleClothesChange(index, e)}
                >
                  <option value="">Select Type</option>
                  <option value="Tshirt">T-shirt</option>
                  <option value="Shirt">Shirt</option>
                  <option value="Jeans">Jeans</option>
                  <option value="Trousers">Trousers</option>
                </select>
              </div>
              <div className="clothes-item">
                <label>Quantity:</label>
                <input
                  type="number"
                  name="quantity"
                  value={clothes.quantity}
                  onChange={(e) => handleClothesChange(index, e)}
                  min="0"
                />
              </div>
              <div className="clothes-item">
                <label>Damage Percentage:</label>
                <input
                  type="number"
                  name="damagePercent"
                  value={clothes.damagePercent}
                  onChange={(e) => handleClothesChange(index, e)}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddClothes}>
            Add Clothes
          </button>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ClothingForm;