import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd'

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState("")
  //handel Form
  const handelSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/category/create-category', { name });
      if (data.success) {
        toast.success(`${name} is created`)
        setName("")
        getAllCategories()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong in input form')
    }
  }
  //get all categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in getting caterogies')
    }
  }
  // console.log(setCategories)
  useEffect(() => {
    getAllCategories();
  }, [])
  //update category
  const handelUpdate = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.put(`http://localhost:5000/api/v1/category/update-category/${selected._id}`, { name: updatedName })
      if (data.success) {
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategories();
      } else {
        toast.error("Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went Wrong")
    }
  }
  const handelDelete = async(pId) =>{
    try {
      let anwser = window.prompt("Are you sure you want to delete this Product?")
      if(!anwser) return;
      const {data} = await axios.delete(`http://localhost:5000/api/v1/category/delete-category/${pId}`)
      if(data.success || anwser){
        toast.success(`${name} is deleted successfully`);
        getAllCategories();
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Category</h1>
            <div className='p-3 w-50 ' >
              <CategoryForm
                handelSubmit={handelSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <>
                    <tr>
                      <td key={c._id}>{c.name}</td>
                      <td><button
                        className='btn btn-primary ms-1'
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(c.name);
                          setSelected(c)
                        }} >Edit</button>
                      <button className='btn btn-danger ms-1' onClick={()=>handelDelete(c._id)}>Delete</button></td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
            <CategoryForm value={updatedName} setValue={setUpdatedName} handelSubmit={handelUpdate} />
          </Modal>
        </div>
      </div>

    </Layout>
  )
}

export default CreateCategory