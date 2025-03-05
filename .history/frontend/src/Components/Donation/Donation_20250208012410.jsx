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

  const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });
  
    const changeHandler = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

  const donation = async () => {
    console.log("donation Function Executed",formData);
    let responseData;
    await fetch('http://localhost:4000/login',{
      method:'POST',//post is to send data to the server
      headers:{
        Accept:'application/form-data',//client needs the data in form-data format
        'content-Type':'application/json',//Indicates that the data being sent in the body of the request is in JSON format. 
      },
      body: JSON.stringify(formData),//Example Input: { username: 'John', email: 'john@example.com', password: '1234' }
                                            //Output: {"username":"John","email":"john@example.com","password":"1234"}
    }).then((response)=>response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem('auth-token',responseData.token);
      //in local storage we are saving our generated token in the key name auth-token
      window.location.replace("/");
      //here we are sending our user to the home page
    }
    else{
      alert(responseData.errors);
    }
  }

  return (
    <div className="container">
      <h1>Donate Now</h1>
      <form action="/submit-donation" method="post">
        <input className="inpt" value={formData.email} onChange={changeHandler} type="text" name="name" placeholder="Your Name" required />
        <input className="inpt" value={formData.email} onChange={changeHandler} type="email" name="email" placeholder="Your Email" required />
        <input className="inpt" value={formData.email} onChange={changeHandler} type="number" name="phone" placeholder="Enter Phone number" required />
        <input className="inpt" value={formData.address} onChange={changeHandler} type="text" name="address" placeholder="Your Address" required />
        <input className="inpt" value={formData.city} onChange={changeHandler} type="text" name="city" placeholder="Your City" required />
        <input className="inpt" value={formData.pincode} onChange={changeHandler} type="text" name="pincode" placeholder="Your Pincode" required />
        <p>Give details about the clothes you want to donate by clicking here!!!</p>

        <div className="container-in">
          <select className="inpt" onChange={changeHandler} name="type" required>
            <option value="">Select Type</option>
            <option value="T-shirt">T-shirt</option>
            <option value="Shirt">Shirt</option>
            <option value="Jeans">Jeans</option>
            <option value="Trouser">Trouser</option>
          </select>
          <input className="inpt" onChange={changeHandler} type="text" name="quantity" placeholder="Quantity" required />
          <input className="inpt" onChange={changeHandler} type="text" name="damage" placeholder="Damage Percentage" required />
          <textarea name="description" onChange={changeHandler} rows="1" cols="50" placeholder="Enter description..."></textarea>
          <button className="btns" onClick={addRow}>ADD</button>
        </div>

        {rows.map((row) => (
          <div className="container-in" key={row.id}>
            <select className="inpt"onChange={changeHandler} name="type" required>
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
