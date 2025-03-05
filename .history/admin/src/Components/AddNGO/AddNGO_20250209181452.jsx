import React ,{from 'react'
import './AddNGO.css'
const AddNGO = () => {
  return (
    <div className="form-container">
            <form action="submit.php" method="post" className="forms">
                <label className="ls" htmlFor="ngo-name">NGO Name:</label>
                <input className="ints" type="text" id="ngo-name" name="ngo_name" required />
                <br />
                <label className="ls"  htmlFor="ngo-url">NGO URL:</label>
                <input className="ints" type="url" id="ngo-url" name="ngo_url" required />
                <br />
                <button className="btns"type="submit">Submit</button>
            </form>
        </div>
  )
}

export default AddNGO
