import React from 'react'
import { useSearch } from '../../context/search'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SearchInput = () => {
    const [values,setValues] = useSearch()
    const navigate = useNavigate();
    const handelSubmit = async(e) =>{
        try {
            e.preventDefault()
           const {data} = await axios.get(`http://localhost:5000/api/v1/product/search/${values.keyword}`)
           setValues({...values,result:data})
           navigate("/search")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form className="d-flex" role="search" onSubmit={handelSubmit}>
            <input className="form-control me-2"
             type="text" 
             placeholder="Search" 
             aria-label="Search" 
             value = {setValues.keyword}
             onChange={(e) => setValues({...values,keyword : e.target.value})}
             />
            <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

    )
}

export default SearchInput