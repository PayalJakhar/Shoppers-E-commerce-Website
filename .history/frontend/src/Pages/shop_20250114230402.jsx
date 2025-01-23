import React from 'react'
import Hero from '../Components/Hero/Hero'
import Popular from '../Components/Popular/Popular'
import Offers from '../Components/Offers/Offers'
export default function shop() {
  return (
    <div style={{display:'flex', flexDirection:'column', gap:40px}}>
      <Hero/>
      <Popular/>
      <Offers/>
    </div>
  )
}
