import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ProductDetails = () => {
  const params = useParams()
  const [product, setProduct] = useState({})
  const [category, setCategory] = useState("")
  const [realetdProduct, SetRealtedProduct] = useState([])


  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/get-product/${params.slug}`)
      setProduct(data?.product)
      setCategory(data?.product.category)
      getSimilarProduct(data?.product._id,data?.product.category._id);
    } catch (error) {
      console.log(error)
    }
  }
  console.log(product)
  useEffect(() => {
    if (params?.slug) getProduct()
  }, [params?.slug])

  //related product
  const getSimilarProduct = async (pid,cid) => {
    try {
      const {data} = await axios.get(`http://localhost:5000/api/v1/product/related-product/${pid}/${cid}`)
      SetRealtedProduct(data?.products)
    } catch (error) {
      console.log(error)
    }
  }
console.log(realetdProduct)
  return (
    <Layout>
      <div className='row container mt-2' >
        <div className='col-md-6'>
          <img src={`http://localhost:5000/api/v1/product/product-photo/${product._id}`}
            className="card-img-top" alt={product.name}
            height="500"
            width="350" />
        </div>
        <div className='col-md-6'>
          <h1 className='text-center'>Product Details</h1>
          <h6>name: {product.name}</h6>
          <h6>Description: {product.description}</h6>
          <h6>Price: {product.price}</h6>
          <h6>Category: {category.name}</h6>
          <h6>Shipping: {product.shipping}</h6>
          <button className='btn btn-secondary ms-1'>ADD TO CART</button>
        </div>
      </div>
      <hr/>
      <div className='row' >
        <h3>Similar products</h3>
        {realetdProduct.length < 1 && (<p>No similar product found</p>)}
        <div className='d-flex flex-wrap'>
        {realetdProduct?.map(p => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top" alt="..." style={{ width: "100%", height: "13vw" }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">{p.price}</p>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>

            ))}
            </div>
        </div>
    </Layout>
  )
}

export default ProductDetails