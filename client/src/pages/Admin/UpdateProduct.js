import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
const { Option } = Select

export const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [photo, setPhoto] = useState("");
  const [shipping, setShipping] = useState("");
  const [id, setId] = useState("")
  const [categoryid, SetCategoryid] = useState("")
  const navigate = useNavigate()
  const params = useParams()


  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`);
      console.log(data)
      setName(data.product.name)
      setId(data.product._id)
      SetCategoryid(data.product.category._id)
      setDescription(data.product.description)
      setCategory(data.product.category)
      setPrice(data.product.price)
      setQuantity(data.product.quantity)
      setPhoto(data.product.photo)
      setShipping(data.product.shipping)
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  //get all categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category._id);
      }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong in getting caterogies')
    }
  }

  useEffect(() => {
    // getAllCategories();
    getSingleProduct();
    //eslint-disable-next-line
  }, [])
  const handelUpdate = async (e) => {
    e.preventDefault();
    try {

      const ProductData = new FormData()
      ProductData.append("name", name)
      ProductData.append("description", description)
      ProductData.append("price", price)
      ProductData.append("category", categoryid)
      ProductData.append("quantity", quantity)
      ProductData.append("photo", photo)
      const { data } = await axios.put(`http://localhost:5000/api/v1/product/update-product/${id}`, ProductData)
      console.log(data)
      if (data?.success) {
        toast.success('Product Updated Successfully')
        navigate('/dashboard/admin/products')
      } else {
        toast.error(data?.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
         const handelDelete = async () => {
          try {
            let anwser = window.prompt("Are you sure you want to delete this Product?")
            if(!anwser) return;
          const {data} = await axios.delete(`http://localhost:5000/api/v1/product/delete-product/${id}`)
          toast.success("Product deleted Successfully")

        } catch (error) {
        console.log(error)
        toast.error('something went wrong')
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
            <h1>Update Product</h1>
            <div className='m-1 w-75 ' >
              <Select bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className='form-select mb-3' onChange={(value) => { setCategory(value) }}
                value={category.name}
              >
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
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <input type="text-aria"
                  value={description}
                  placeholder="Write a description"
                  className='form-control'
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <input type="number"
                  value={price}
                  placeholder="Enter the price"
                  className='form-control'
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <input type="number"
                  value={quantity}
                  placeholder="Quantity"
                  className='form-control'
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className='mb-3' >
                <Select
                  bordered={false}
                  placeholder="Select Shipping"
                  size="large"
                  className='form-control'
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button className='btn btn-primary' onClick={handelUpdate}> Update Product</button>
                <button className='btn btn-danger' onClick={handelDelete}> Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  )
}
