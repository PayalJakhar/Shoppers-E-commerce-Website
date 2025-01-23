import React,{useContext} from 'react'
import {ShopContext} from '../Context/ShopContext'
import {useParams} from 'react-router-dom'

export default function Product() {
  const {all_product} = useContext(ShopContext);
  const {productID} = useParams(); // we have to give the name the same name as the parameter as been given
  // using the productID we will look for the product in the all_product;

  const product = all_product.find((e)=>{e.id===productID})

  return (
    <div>
      
    </div>
  )
}
