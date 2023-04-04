import React,{ useState } from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios'
import { useAuth } from '../../context/auth'

const Login = () => {
  const [email,setEmail]= useState("");
  const [password,setPassword]= useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth,setAuth] = useAuth();

  const handelSubmit= async(e)=>{
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/api/v1/auth/login",{email,password});
        if(res.data.success){
            toast.success(res.data.message);
            setAuth({
                ...auth,
                user : res.data.user,
                token : res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state || "/");
        }else{
            toast.error(res.data.message)
        }
        
    } catch (error) {
       console.log(error)
       toast.error('Something went Wrong') 
    }
   
}
  return (
    <div>
      <Layout>
            <div className='register' >
                <form onSubmit={handelSubmit}>
                   
                    <div class="mb-3">
                        <label for="exampleInputName" className="form-label">Email</label>
                        <input 
                        type="email" 
                        value={email}
                        onChange={((e)=>setEmail(e.target.value))}
                        className="form-control"
                        placeholder='Enter your email'
                        required
                        />  
                    </div>
                    <div class="mb-3">
                       <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

                        <input
                        type="password"
                        value={password}
                        onChange={((e)=>setPassword(e.target.value))}
                        className="form-control"
                        placeholder='Enter your Password'
                        required
                        />
                    </div>
                   
                   <button type="submit" className="btn btn-primary">Login</button>
                   <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}}>Forget Password?</button>

                </form>
            </div>
        </Layout>
    </div>
  )
}

export default Login