import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
        <Route exact path='/>
      </Routes>
    </div>
  )
}

export default Admin

