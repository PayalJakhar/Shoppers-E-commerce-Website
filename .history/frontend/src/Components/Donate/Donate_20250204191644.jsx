import React , {useS} from 'react'
import './Donate.css'
const Donate = () => {

  return (
    <div className='donate'>
      <p>💙 Make a Difference Today! 💙
      Your support matters—click to donate and spread kindness</p>
      <div className='donate-in'><button className='para'>Donate</button>
      <button className='text' onClick={vanish}>X</button></div>
    </div>
  )
}

export default Donate
