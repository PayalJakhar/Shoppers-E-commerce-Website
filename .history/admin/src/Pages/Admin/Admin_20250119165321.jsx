import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
        <Route exact path='/addproduct' element={<AddProduct}/>
        <Route exact path='/listproduct' element={<ListProduct/>}/>
      </Routes>
    </div>
  )
}

export default Admin

