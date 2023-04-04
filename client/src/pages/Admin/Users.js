import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])
  const [id,setId] = useState()
  const navigate = useNavigate()
  const getAllUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/v1/auth/users')
      setUsers(data?.users)
      setId(data?.users?._id)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  const handelDelete = async(id)=>{
    try {
      await axios.delete(`http://localhost:5000/api/v1/auth/delete-user/${id}`)
        toast.success(`user is deleted successfully`);
        getAllUsers()
  
      
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
  console.log(users)
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>All Users</h1>
            <div className='d-flex flex-wrap' >
              {users?.map(p => (
                <div className="card m-2" style={{ width: '18rem' }}>
                  <img src={"https://raw.githubusercontent.com/WLAN-Kabel/iobroker.contact/HEAD/admin/contact.png" }
                    className="card-img-top" alt="..." style={{ width: "100%", height: "13vw" }} />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.email}</p>
                    <p className="card-text">{p.adresse}</p>
                    <button className='btn btn-danger'onClick={()=>handelDelete(p._id)}>Delete User</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Users