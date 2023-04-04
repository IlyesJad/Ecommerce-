import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';
const { Option } = Select
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const[shipping,setShipping] = useState("")
  const navigate = useNavigate()

  //get all categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
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
  const handelCreate = async(e)=>{
      e.preventDefault();
      try {
        const ProductData = new FormData()
        ProductData.append("name",name)
        ProductData.append("description",description)
        ProductData.append("price",price)
        ProductData.append("category",category)
        ProductData.append("quantity",quantity)
        ProductData.append("photo",photo)
        const {data} = await axios.post("http://localhost:5000/api/v1/product/create-product", ProductData)
        if(data?.success){
          toast.success('Product created Successfully')
          navigate('/dashboard/admin/products')
        }else{
          toast.error(data?.message)
        }
      } catch (error) {
        console.log(error)
        toast.error("Something went wrong")
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
            <h1>Create Product</h1>
            <div className='m-1 w-75 ' >
              <Select bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                {categories?.map(c => (
                  <Option key={c._id} value={c._id} >{c.name}</Option>
                ))}
              </Select>
              <div className='mb-3'>
                <label className="btn btn-outline-secondary col-md-12" >
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name='photo'
                    accept='image/*'
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className='mb-3' >
                <input type="text"
                value={name}
                placeholder="Write a name"
                className='form-control'
                onChange={(e)=>setName(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <input type="text-aria"
                value={description}
                placeholder="Write a description"
                className='form-control'
                onChange={(e)=>setDescription(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <input type="number"
                value={price}
                placeholder="Enter the price"
                className='form-control'
                onChange={(e)=>setPrice(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <input type="number"
                value={quantity}
                placeholder="Quantity"
                className='form-control'
                onChange={(e)=>setQuantity(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <Select 
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className='form-control'
                onChange={(value)=>setShipping(value)}
                >
                  <Option value ="0">No</Option>
                  <Option value ="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3'>
                  <button className='btn btn-primary' onClick={handelCreate}> Create Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}

export default CreateProduct