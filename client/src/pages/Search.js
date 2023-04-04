import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../context/search'
const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <Layout>
            <div className='container'>
                <div className='text-center'>
                    <h1>Search Result</h1>
                    <h6>{values?.result.length < 1
                        ? 'No Product Found' :
                        `found ${values?.result.length}`}</h6>
                    <div className='d-flex flex-wrap mt-4' >
                        {values?.result.map(p => (
                            <div className="card m-2" style={{ width: '18rem' }}>
                                <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top" alt="..." style={{ width: "100%", height: "13vw" }} />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description}</p>
                                    <p className="card-text">{p.price}</p>
                                    <button className="btn btn-primary">More Details</button>
                                    <button className="btn btn-secondary">Add to Cart</button>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search