import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
export default function shop() {
  return (
    <div style={{display='flex' }}>
      <Hero/>
      <Popular/>
      <Offers/>
    </div>
  )
}
