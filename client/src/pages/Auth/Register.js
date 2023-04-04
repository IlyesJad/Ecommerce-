import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

import axios from 'axios'
import { toast } from 'react-hot-toast'


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [adresse, setAdresse] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/v1/auth/register", { name, email, password, phone, adresse, answer });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/");
            } else {
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
                    <div class="mb-3">
                        <label htmlFor="exampleInputName" className="form-label">Ansewer</label>

                        <input
                            type="text"
                            value={answer}
                            onChange={((e) => setAnswer(e.target.value))}
                            className="form-control"
                            placeholder='What is your favoirte sport'
                            required
                        />
                    </div>


                    <button type="submit" className="btn btn-primary">Submit</button>

                </form>
            </div>
        </Layout>
    )
}


export default Register