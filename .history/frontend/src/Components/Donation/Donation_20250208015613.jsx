import React, { useState } from "react";
import "./Donation.css";

const Donation = () => {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHappen, setIsHappen] = useState(false);
  const [selectedNGOs, setSelectedNGOs] = useState(null);

  const open = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const addRow = (e) => {
    e.preventDefault();
    setRows([...rows, { id: rows.length }]);
  };

  const removeRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const NGOs = [
    { name: "Red Cross", url: "https://www.redcross.org" },
    { name: "UNICEF", url: "https://www.unicef.org" },
    { name: "Save the Children", url: "https://www.savethechildren.net" },
    { name: "Charity: Water", url: "https://www.charitywater.org" },
    { name: "ANY", url: "https://www.charity.org" }
  ];

  const handleNGOSelect = (ngo) => {
    if (ngo.url !== "") {
      setSelectedNGOs(ngo);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    address: '',
    city: '',
    pincode: ''
  });

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
  const handleRemoveClothes = (index) => {
    const updatedClothes = clothesDetails.filter((_, i) => i !== index); // Remove the item at the given index
    setClothesDetails(updatedClothes);
  };
  //********************************* */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    console.log("Donation function executed", clothesDetails);

    const donationData = {
      ...formData, // Spread the form data
      clothesDetails,
      ngo: { name: ngoLinks[selectedNGO]?.name || "" },
      donationDate: document.getElementById("collection-date").value, // Get the selected date
    };

    let responseData;
    await fetch('http://localhost:4000/donation', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(donationData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      alert("Donation Successful! Thank you for your contribution.");
      window.location.replace("/");
    } else {
      alert(responseData.error || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input className="inpt" value={formData.name} onChange={handleInputChange} type="text" name="name" placeholder="Your Name" required />
        <input className="inpt" value={formData.email} onChange={handleInputChange} type="email" name="email" placeholder="Your Email" required />
        <input className="inpt" value={formData.phone} onChange={handleInputChange} type="number" name="phone" placeholder="Enter Phone number" required />
        <input className="inpt" value={formData.address} onChange={handleInputChange} type="text" name="address" placeholder="Your Address" required />
        <input className="inpt" value={formData.city} onChange={handleInputChange} type="text" name="city" placeholder="Your City" required />
        <input className="inpt" value={formData.pincode} onChange={handleInputChange} type="text" name="pincode" placeholder="Your Pincode" required />
        <p>Give details about the clothes you want to donate by clicking here!!!</p>

        <div className="container-in">
          <select className="inpt" value={clothes.type} onChange={(e) => handleClothesChange(index, e)} name="type" required>
            <option value="">Select Type</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Shirt">Shirt</option>
            <option value="Jeans">Jeans</option>
            <option value="Trouser">Trouser</option>
          </select>
          <input className="inpt" value={clothes.quantity} onChange={(e) => handleClothesChange(index, e)} type="text" name="quantity" placeholder="Quantity" required />
          <input className="inpt" {clothes.damagePercent} onChange={(e) => handleClothesChange(index, e)} type="text" name="damage" placeholder="Damage Percentage" required />
          <textarea name="description"  rows="1" cols="50" placeholder="Enter description..."></textarea>
          <button className="btns" onClick={addRow}>ADD</button>
        </div>

        {rows.map((row) => (
          <div className="container-in" key={row.id}>
            <select className="inpt"onChange={changeHandler} value={clothes.type} name="type" required>
              <option value="">Select Type</option>
              <option value="T-shirt">T-shirt</option>
              <option value="Shirt">Shirt</option>
              <option value="Jeans">Jeans</option>
              <option value="Trouser">Trouser</option>
            </select>
            <input className="inpt" onChange={changeHandler} type="text" name="quantity" placeholder="Quantity" required />
            <input className="inpt" onChange={changeHandler}  type="text" name="damage" placeholder="Damage Percentage" required />
            <textarea name="description" onChange={changeHandler} rows="1" cols="50" placeholder="Enter description..."></textarea>
            <button className="btn" onClick={addRow}>ADD</button>
            <button className="btn" onClick={() => removeRow(row.id)}>X</button>
          </div>
        ))}

        {isOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={close}>&times;</span>
              <h2>Preferred NGOs</h2>
              <div className="dropdown">
                <div className="dropdown-header" onClick={() => setIsHappen(!isHappen)} onChange={changeHandler}>
                  {selectedNGOs ? `${selectedNGOs.name}`  : "Choose NGOs"}
                </div>
                {isHappen && (
                  <div className="dropdown-menu">
                    {NGOs.map((ngo, index) => (
                      <label key={index} className="ngo-option">
                        <input
                          type="radio"
                          name="ngo"
                          checked={selectedNGOs && selectedNGOs.url === ngo.url}
                          onChange={() => handleNGOSelect(ngo)}
                        />
                        <span onClick={() => ngo.url && window.open(ngo.url, "_blank")}>{ngo.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <label>Preferred Date for Donation:</label>
              <input
                className="inpts"
                type="date"
                name="preferredDate"
                onChange={changeHandler}
                required
              />
              <button className="donate-button">Donate Now</button>
            </div>
          </div>
        )}

        <button className="btn" type="submit" onClick={open}>Proceed</button>
      </form>
    </div>
  );
};

export default Donation;



              <div className="remove-clothes-item">
                <button
                  type="button"
                  onClick={() => handleRemoveClothes(index)}
                //   style={{ color: 'red', fontSize: '1rem' }}
                >
                  X
                </button>
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddClothes}>
            Add Clothes
          </button>
        </div>

        <button type="submit" onClick={openModal}>Proceed</button>
      </form>
      {isOpen && (
        <div className="modal-overlay1">
          <div className="modal-content1">
            <span className="close1" onClick={closeModal}>&times;</span>
            <h2>🌼 Make a Donation 🌼</h2>

            <form className="donation-form" onSubmit={handleDonationSubmit}>
              {/* NGO Selection Dropdown */}
              <label htmlFor="ngo-select" >Select an NGO:</label>
              <select id="ngo-select" className="dropdown1" value={selectedNGO} onChange={handleNGOChange}>
                {/* <option value="">-- Choose an NGO --</option>
                <option value="ngo1">Helping Hands Foundation</option>
                <option value="ngo2">Hope for All</option>
                <option value="ngo3">Bright Future Trust</option>
                <option value="ngo4">Care & Share</option> */}
                <option value="">-- Choose an NGO --</option>
                {Object.entries(ngoLinks).map(([key, ngo]) => (
                  <option key={key} value={key}>{ngo.name}</option>
                ))}
              </select>
              {selectedNGO && (
                <div className="ngo-details">
                  <p><b>Selected NGO:</b> {ngoLinks[selectedNGO].name}</p>
                  <button 
                    className="visit-site-button"
                    onClick={() => window.open(ngoLinks[selectedNGO].url, "_blank")}
                  >
                    Visit Site
                  </button>
                </div>
              )}

              {/* Date Picker for Collection */}
              <label htmlFor="collection-date" >Preferred Collection Date:</label>
              <input type="date" id="collection-date" className="date-picker" />

              {/* Submit Button */}
              <button type="submit" className="donate-button1">Make Your Donation</button>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Donation;