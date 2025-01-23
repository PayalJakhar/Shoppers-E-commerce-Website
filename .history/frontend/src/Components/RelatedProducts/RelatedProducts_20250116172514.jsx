import React from 'react'
import './RelatedProducts.css'
import data_product from '../Assets/Frontend_Assets/data'
import Item from '../'
const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
        <h1>Telated Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            {data_product.map((item,i)=>{

            })}
        </div>
      
    </div>
  )
}

export default RelatedProducts
