import React from 'react';
import { Link } from 'react-router-dom'; // Corrected import for Link
import './Item.css';

export default function Item(props) {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img src={props.image} alt={props.name || "Product"} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-price-new">${props.new_price}</div>
        <div className="item-price-old">${props.old_price}</div>
      </div>
    </div>
  );
}
