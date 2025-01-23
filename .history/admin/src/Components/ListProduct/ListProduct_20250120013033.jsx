import React,{useState, useEffect} from 'react'
import './ListProduct.css'
import cross_icon from'../../AddProductssets/Assets_Admin/cross_icon.png'
const ListProduct = () => {
    const [allproducts,setAllProducts] = useState([]);

    const fetchInfo = async ()=>{
        await fetch('http://localhost:4000/allproducts').then((res)=> res.json()).then((data)=>{setAllProducts(data)})

    }

    useEffect(()=>{

    },[])//now we want to see the products so we add it here and we want it only once so [] brackets

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        //we will map the data which we fetch through api
        <hr/>
        {allproducts.map((product,index)=>{
            return <><div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img alt="" onClick={()=>{remove_product(product.id)}}className='listproduct-remove-icon' src={cross_icon} alt="" />
              
                </div>
                <hr/>
                </>
        })}
      </div>
    </div>
  )
}

export default ListProduct




















