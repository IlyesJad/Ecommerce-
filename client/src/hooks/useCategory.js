import{useState,useEffect} from 'react'
import axios from 'axios'

export default function useCategory(){
    const [categories,setCategories] = useState([])
    //get categories
    const getCategories = async()=>{
        try {
            const { data } = await axios.get("http://localhost:5000/api/v1/category/get-category");
            if (data?.success) {
              setCategories(data?.category);
            }
        } catch (error) {
            console.log(error)

        }
    }
    //life cycle
    useEffect(()=>{
        getCategories()
    },[])
    return categories

}