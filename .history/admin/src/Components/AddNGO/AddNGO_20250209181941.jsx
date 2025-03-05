import React ,{useState}from 'react'
import './AddNGO.css'
const AddNGO = () => {
  return (
    const[ngoDetails,setngoDetails]=useState({
        name:"",
        url:"",
    })
    const changeHandle=(e)=>{
        setngoDetails({...productDetails,[e.target.name]:e.target.value});
    }
    <div className="form-container">
            <form action="submit.php" method="post" className="forms">
                <label className="ls" htmlFor="ngo-name">NGO Name:</label>
                <input className="ints" value={ngoDetails.name} onChange={ChangeHandle} type="text" id="ngo-name" name="ngo_name" required />
                <br />
                <label className="ls"  htmlFor="ngo-url">NGO URL:</label>
                <input className="ints" value={ngoDetails.url} onChange={ChangeHandle} type="url" id="ngo-url" name="ngo_url" required />
                <br />
                <button className="btns"type="submit" onClick={()=>{Add_NGO()}}>Submit</button>
            </form>
        </div>
  )
}

export default AddNGO
