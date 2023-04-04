import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';



const Categories = () => {
  const [products,setProducts] = useState([])
  const [category,setCategory] = useState([])
  const params = useParams()
  const navigate = useNavigate()

  const getProductByCat = async() =>{
    const {data} = await axios.get(`http://localhost:5000/api/v1/product/product-category/${params.slug}`)
    setProducts(data?.products)
    setCategory(data?.category)
  }
  useEffect(()=>{
    getProductByCat()
  },[])
 console.log(products)
 console.log(category)

  return (
    <Layout>
      <div className='container' >
        <h1>{category?.name}</h1>
        <div className='d-flex flex-wrap' >
            {products?.map(p => (
              <div className="card m-2" style={{ width: '18rem' }}>
                <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top" alt="..." style={{ width: "100%", height: "13vw" }} />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description}</p>
                  <p className="card-text">{p.price}</p>
                  <button className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)} >More Details</button>
                  <button className="btn btn-secondary ms-1">Add to Cart</button>
                </div>
              </div>
            
            ))}
          </div>
      </div>

    </Layout>
  )
}

export default Categories