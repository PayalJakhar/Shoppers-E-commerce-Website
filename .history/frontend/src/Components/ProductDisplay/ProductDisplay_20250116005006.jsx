import React from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets'
const ProductDisplay = (props) => {
    const {product} = props;
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
            <img src={product.image} alt=""/>
            <img src={product.image} alt=""/>
            <img src={product.image} alt=""/>
            <img src={product.image} alt=""/>
        </div>
        <div className="productdisplay-img">
            <img className='prductdisplay-main-image' src={product.image} alt=""/>
        </div>
      </div>
      <div className="productdisplay-right">
        <h1></h1>
      </div>
    </div>
  )
}

export default ProductDisplay
