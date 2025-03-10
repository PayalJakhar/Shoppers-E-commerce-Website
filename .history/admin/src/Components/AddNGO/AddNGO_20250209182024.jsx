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

    const Add_Product=async()=>{
        console.log(productDetails);
        let responseData;
        let product=productDetails;

        let formData=new FormData();
        formData.append('product',image); // product is the fielname which is empty where image will be stored which I specified in my backend

        await fetch('http://localhost:4000/upload', {
            method:'POST',
            headers:{
                Accept:'application/json',
               
            },
            body:formData,
        }).then((resp)=>resp.json()).then((data)=>{responseData=data}) // this is the promise where we are getting in json and then string responseData

        if(responseData.success){
            product.image=responseData.image_url;
            console.log(product);
            //adding data to mongodb
            await fetch('http://localhost:4000/addproduct',{
                method:'post',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Product added"):alert("Failed")
            })
        }
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
