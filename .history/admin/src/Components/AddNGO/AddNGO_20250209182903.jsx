import React ,{useState}from 'react'
import './AddNGO.css'
const AddNGO = () => {
  return (
    const[ngoDetails,setngoDetails]=useState({
        name:"",
        url:"",
    })
    const changeHandle=(e)=>{
        setngoDetails({...ngoDetails,[e.target.name]:e.target.value});
    }

    const addNGO = async (e) => {
        e.preventDefault();
        console.log("NGO Details Submitted:", ngoDetails);

        await fetch("http://localhost:4000/addngo", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(ngoDetails),
        })
        .then((resp) => resp.json())
        .then((data) => {
            data.success ? alert("NGO added") : alert("Failed");
        });
    };
    

    <div className="form-container">
            <form action="submit.php" method="post" className="forms">
                <label className="ls" htmlFor="ngo-name">NGO Name:</label>
                <input className="ints" value={ngoDetails.name} onChange={ChangeHandle} type="text" id="ngo-name" name="ngo_name" required />
                <br />
                <label className="ls"  htmlFor="ngo-url">NGO URL:</label>
                <input className="ints" value={ngoDetails.url} onChange={ChangeHandle} type="url" id="ngo-url" name="ngo_url" required />
                <br />
                <button className="btns"type="submit" onClick={()=>{addNGO()}}>Submit</button>
            </form>
        </div>
  )
}

export default AddNGO
