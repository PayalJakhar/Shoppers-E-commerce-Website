import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
import NewCollections from '../Components/NewCollections/NewCollections'
import NewsLetter from '../Components/NewsLetter/NewsLetter'
export default function shop() {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:'200px'}}>
      <div><Hero/></div>
      <div><Popular/></div>
      <div><Offers/></div>
      <div><NewCollections/></div>
    </div>
  )
}
