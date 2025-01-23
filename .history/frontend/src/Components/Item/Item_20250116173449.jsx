import React from 'react'
import { Link } from 'react-router-dom';
import './Item.css'
export default function Item(props) {
  return (
    <div className='item'>
        <Link to={`/product/${props.id}`}><img onClick={window.scroll} src={props.image} alt="" /></Link> 
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
    </div>
  )
}
