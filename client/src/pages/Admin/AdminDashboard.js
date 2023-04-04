import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
  const [auth] = useAuth()
  return (
    <Layout>
     <div className="container-fluid mt-4 p-3">
  <div className="row">
    <div className="col-md-3">
      <AdminMenu/>
      </div>
    <div className="col-md-9">
      <div className="card">
        <h1>Admin name :{auth?.user?.name}</h1>
        <h2>Admin Email : {auth?.user?.email}</h2>
        <h2>Admin Phone : {auth?.user?.phone}</h2>
      </div>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default AdminDashboard