import React from 'react'
import './DescriptionBox.css'

const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className="description-navigator">
        <div className="description-nav-box">Description</div>
        <div className="description-nav-box fade">Reviews</div>
      </div>
      <div className="description-description">
        <p>
        Discover a world of convenience and variety with our wide range of premium products, from fashion and electronics to home essentials and beyond. We are committed to providing you with an exceptional shopping experience, offering competitive prices, fast shipping, and unparalleled customer support. Whether you're looking for the latest trends or timeless classics, Shopper is here to help you find exactly what you need. 
        </p>
        <p>
         Shop with confidence and enjoy the ease of shopping from the comfort of your home!
        </p>
      </div>
    </div>
  )
}

export default DescriptionBox
