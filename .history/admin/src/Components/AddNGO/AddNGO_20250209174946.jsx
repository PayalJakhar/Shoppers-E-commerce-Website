import React from 'react'

const AddNGO = () => {
  return (
    import React from "react";

const NgoForm = () => {
    return (
        <div className="form-container">
            <form action="submit.php" method="post">
                <label htmlFor="ngo-name">NGO Name:</label>
                <input type="text" id="ngo-name" name="ngo_name" required />
                <br />
                <label htmlFor="ngo-url">NGO URL:</label>
                <input type="url" id="ngo-url" name="ngo_url" required />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
  )
}

export default AddNGO
