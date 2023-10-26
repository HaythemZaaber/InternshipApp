import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Dashboard/Navbar'
import Sidebar from '../../components/Dashboard/Sidebar'

const AdminDashboard = () => {
  return (
    <div>
      <Navbar/>
      <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashboard