import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/Frontend_Assets/breadcrum_arrow.png'

const Breadcrum = (props) => {
    const {product} = props;
    return (
        <div className='breadcrum'>
            HOME <img src={arrow_icon} alt=""/> SHOP
        </div>
    )
}

export default Breadcrum
