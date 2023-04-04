import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout/Layout'
import { Checkbox, Radio } from 'antd'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart';


const Home = () => {

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState()
  const navigate = useNavigate();
  const [cart,setCart] = useCart();

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/product/product-count")
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    if(page===1) return;
    loadMore();
  },[page])
  //load more
  const loadMore = async()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products,...data?.products])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //get Products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:5000/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error("something went wrong")
    }
  }
  //get all categories
  const getAllCategories = async (req, res) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handelFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter(c => c !== id)
    }
    setChecked(all)
  }
  useEffect(() => {
    getTotal();
    getAllCategories();
    if (!checked.length || !radio.length) getAllProducts();
    //eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (checked.length || radio.length) filterProduct()
  }, [checked, radio])

  // get flitred product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/v1/product/product-filters', { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='row mt-3'>
        <div className='col-md-3' >
          <h4 className='text-center'>Filter by category</h4>
          <div className='d-flex flex-column'>
            {categories?.map(c => (
              <Checkbox key={c._id} onChange={(e) => handelFilter(e.target.checked, c._id)}>
                {c.name}
              </Checkbox>
            ))}
          </div>
          <h4 className='text-center mt-4'>Filter by Price</h4>
          <div className='d-flex flex-column '>
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <button className='btn btn-danger' onClick={() => window.location.reload()} >Rest Filters</button>
          </div>
        </div>
        <div className='col-md-9'>
          
          <h1>All products</h1>
          <h1>Total Product : {total}</h1>
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
                  <button className="btn btn-secondary ms-1"
                   onClick={()=>{setCart([...cart,p]);
                   localStorage.setItem("cart",JSON.stringify([...cart,p]));
                   toast.success('Product added to cart')}}  >Add to Cart</button>
                </div>
              </div>

            ))}
          </div>
        </div>
      </div>
      <div >{products && products.length < total && (
        <button className='btn btn-primary'
        onClick={(e)=>{
          e.preventDefault();
          setPage ( page +1)
        }} 
         >{loading ? "Loading..." : "Loadmore"}</button>
      )}</div>
    </Layout>
  )
}

export default Home