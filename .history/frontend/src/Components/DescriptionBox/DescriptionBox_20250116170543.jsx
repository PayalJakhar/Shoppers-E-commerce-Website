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
        <p></p>
      </div>
    </div>
  )
}

export default DescriptionBox
