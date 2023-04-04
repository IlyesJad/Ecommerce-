import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useCart } from '../../context/cart';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';
const CartPage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const navigate = useNavigate();

    //total Price
const totalPrice = () =>{
    try {
        let total = 0
    cart?.map(item => { total = total+ item.price })
    return total.toLocaleString("en-US",{style : "currency",currency : "USD"});
    } catch (error) {
        console.log(error)
    }
}


    //remove item
    const removeCartItem = async (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id = pid)
            myCart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(myCart))
            setCart(myCart)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <Layout>
            <div className='container' >
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2'>{`Hello ${auth?.token && auth?.user.name}`}</h1>
                        <h4 className='text-center'>
                            {cart.length >= 1 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please login to Checkout"}` : "Your Cart is Empty"}</h4>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'>Cart Item</div>
                        <div className='row'>
                            <div className='col-md-8' >
                                {cart?.map(c => (
                                    <div className='row mb-2 card d-flex flex-row'>
                                        <div className='col-md-4'>{<img src={`http://localhost:5000/api/v1/product/product-photo/${c._id}`}
                                            className="card-img-top" alt="Product Img" style={{ width: "100%", height: "13vw" }} />}</div>
                                        <div className='col-md-5'>
                                            <h3>{c.name}</h3>
                                            <h6>{c.description.substring(0, 30)}</h6>
                                            <h6>Price : {c.price}$</h6>
                                            <button className='btn btn-danger' onClick={() => removeCartItem(c._id)} >Remove</button>
                                        </div>
                                    </div>

                                ))}
                            </div>
                            <div className='col-md-4 text-center'>
                                <h2>Cart Summary</h2>
                               <p>Total |Checkout| Payment</p> 
                               <hr />
                               <h4>Total : {totalPrice()}</h4>
                               {auth?.user?.addresse ? (
                                <>
                                
                                <div className='mb-3'>
                                    
                                    <button 
                                    className='btn btn-outline-warning'
                                    onClick={()=>navigate('/dashboard/user/profile')}
                                    >Update Adresse</button>
                                </div>
                                </>
                               ) : (<>
                               <div className='mb-3' >
                                <h4>Current Adresse</h4>
                                <h5>{auth?.user?.adresse}</h5>
                                {auth?.token ? (<button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Adresse</button>)
                                
                               : (<button onClick={()=>navigate('/login')}>Please login to Checkout</button>)}
                               </div>
                               </>)}
                            
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage