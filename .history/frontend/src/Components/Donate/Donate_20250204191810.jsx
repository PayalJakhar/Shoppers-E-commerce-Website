import React , {useState} from 'react'
import './Donate.css'
const Donate = () => {
    [value,vanish]= useState{''};
  return (
    <div className='donate' style={{display:{value}}}>
      <p>💙 Make a Difference Today! 💙
      Your support matters—click to donate and spread kindness</p>
      <div className='donate-in'><button className='para'>Donate</button>
      <button className='text' onClick={vanish}>X</button></div>
    </div>
  )
}

export default Donate
