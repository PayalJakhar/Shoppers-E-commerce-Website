import React,{useContext} from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'
import

export default function Product() {
  const {all_product} = useContext(ShopContext);
  const {productID} = useParams(); // we have to give the name the same name as the parameter as been given
  // using the productID we will look for the product in the all_product;

  const product = all_product.find((e)=>e.id===Number(productID));// the const product will be equal to an object as all_product is an array of objects
  // as productID should be in number format as e.id is in number format
  return (
    <div>
        <Breadcrum product={product}/>
    </div>
  )
}
