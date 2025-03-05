import React from 'react'
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ListProduct from '../../Components/ListProduct/ListProduct'
import AddNGO from '../../Components/AddNGO/ListProduct'
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
        <Route exact path='/addproduct' element={<AddProduct/>}/>
        <Route exact path='/listproduct' element={<ListProduct/>}/>
        <Route exact path='/addngo' element={<AddNGO/>}/>
      </Routes>
    </div>
  )
}

export default Admin

