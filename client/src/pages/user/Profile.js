import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Profile = () => {
  const [auth,setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [adresse, setAdresse] = useState("");
  const navigate = useNavigate()

//get user data
useEffect(()=>{
  const {email,name,phone,adresse,password} = auth.user
  setName(name)
  setPhone(phone)
  setEmail(email)
  setAdresse(adresse)
  setPassword(password)
},[auth?.user])


  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.put("http://localhost:5000/api/v1/auth/profile", { name, email, password, phone, adresse });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth");
        ls =  JSON.parse(ls)
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile Updated Succefully")
      }
    } catch (error) {
        console.log(error)
        toast.error('Something went Wrong')
    }
}
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>Your Profile</h1>
            <form onSubmit={handelSubmit}>
                    <div class="mb-3">
                        <label for="exampleInputName" className="form-label">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={((e) => setName(e.target.value))}
                            className="form-control"
                            placeholder='Enter your name'
                            required />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputName" className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={((e) => setEmail(e.target.value))}
                            className="form-control"
                            placeholder='Enter your email'
                            required
                            disabled
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>

                        <input
                            type="password"
                            value={password}
                            onChange={((e) => setPassword(e.target.value))}
                            className="form-control"
                            placeholder='Enter your Password'
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Phone</label>

                        <input
                            type="text"
                            value={phone}
                            onChange={((e) => setPhone(e.target.value))}
                            className="form-control"
                            placeholder='Enter your phone'
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Adresse</label>

                        <input
                            type="text"
                            value={adresse}
                            onChange={((e) => setAdresse(e.target.value))}
                            className="form-control"
                            placeholder='Enter your adresse'
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">UPDATE</button>
                </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile