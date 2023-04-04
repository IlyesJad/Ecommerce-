import React,{ useState } from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import {toast} from 'react-toastify'
import axios from 'axios'



const ForgotPassword = () => {
    const [email,setEmail]= useState("");
    const [newPassword,setNewPassword]= useState("");
    const [answer,setAnswer] = useState("")
   

    const navigate = useNavigate();
    const location = useLocation();
    const handelSubmit= async(e)=>{
      e.preventDefault();
      try {
          const res = await axios.post("http://localhost:5000/api/v1/auth/forgot-password",{email,newPassword,answer});
          if(res.data.success){
              toast.success(res.data.message);
              navigate(location.state || "/login");
          }else{
              toast.error(res.data.message)
          }
          
      } catch (error) {
         console.log(error)
         toast.error('Something went Wrong') 
      }
  }
  return (
    <Layout>
        <div className='register' >
                <form onSubmit={handelSubmit}>
                   <h4>RESET PASSWORS</h4>
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
                       <label htmlFor="exampleInputPassword1" className="form-label">New Password</label>

                        <input
                        type="password"
                        value={newPassword}
                        onChange={((e)=>setNewPassword(e.target.value))}
                        className="form-control"
                        placeholder='Enter your New Password'
                        required
                        />
                    </div>
                    <div class="mb-3">
                       <label htmlFor="exampleInputPassword1" className="form-label">Your Anwser</label>

                        <input
                        type="text"
                        value={answer}
                        onChange={((e)=>setAnswer(e.target.value))}
                        className="form-control"
                        placeholder='Enter your New Password'
                        required
                        />
                    </div>
                   <button type="submit" className="btn btn-primary">Reset</button>
                </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword