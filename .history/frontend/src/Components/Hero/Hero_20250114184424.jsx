import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'

export default function Hero() {
  return (
    <div className="hero">
        <div className="hero-left">
            <h2>NEW ARRIVALS ONLY</h2>
            <div>
                <div className="hand-hand-icon">
                    <p>new</p>
                    <img src={hand_icon} alt=""/>
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            
        </div>
        <div className="hero-right">

        </div>
    </div>
  )
}
