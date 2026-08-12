import React from 'react'

import axios from 'axios'
import { useState, useEffect } from 'react'
import Input from '../components/Input'
import trucklogo from '../assets/truck.png'

import cardlogo from '../assets/credit_cardLogo.png'
import cod from '../assets/cod.png'
import payonline from '../assets/onlinepay.png'
import card from '../assets/card.png'
import bank from '../assets/bank.png'
import upi from '../assets/upi.png'

import { useNavigate } from 'react-router-dom'

const Checkout = () => {
  type address_prop = {
    fullname: string,
    number: string,
    address: string,
    pincode: string,
    city: string,
    state: string
  }

  type cartProps = {

    product_id
    :
    number,
    product_img
    :
    string,
    product_name
    :
    string,
    product_price
    :
    number,
    storename
    :
    string,
    user_id
    :
    number,
    quantity:
    number
  }
  const navigate = useNavigate()
  const [cart, setcart] = useState<cartProps[]>([]);
 
  const [paymentoption, setpaymentoption] = useState<string>("")
  const [address, setaddress] = useState<address_prop>({
    fullname: "",
    number: "",
    address: "",
    pincode: "",
    city: "",
    state: ""
  })
  const fetchCart = async () => {
    try {
      console.log("KEY:", import.meta.env.VITE_RAZORPAY_KEY_ID);
      const token = localStorage.getItem('token')
      const res = await axios.get('https://cartify-backend-kzss.onrender.com/buyer/fetch-cart', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      setcart(res.data.products);





    } catch (err) {

    }
  }


  useEffect(() => {
    fetchCart();
  }, [])

  const subtotal = cart.reduce((acc, curr) => acc + curr.product_price * curr.quantity, 0);

  const discount = 100;
  const tax = 50;
  const shipping = 0;

  const totalvalue = subtotal - discount + tax + shipping;
  const onlineCheckout = async (): Promise<void> => {
    try {
      const res = await axios.post('https://cartify-backend-kzss.onrender.com/buyer/checkout-razorpay', {
        amount: totalvalue
      })
      console.log(res.data);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: res.data.id,
        amount: res.data.amount,
        currency: res.data.currency,
        handler: async function (response: any) {
          console.log('payment success', response);
          const token = localStorage.getItem('token')
          
          const verify = await axios.post('https://cartify-backend-kzss.onrender.com/buyer/verify-payment', {
            cart:cart,
            totalamount:totalvalue,
            token:token,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature
          })
          console.log("Verify:", verify.data);
          if(verify.data.success){
            navigate('/my-orders')
            alert('your order placed successfully')
            
          }
          else{
            alert('payment failed')
          }
        }
      }
      const rzp = new window.Razorpay(options)
      rzp.open()
      rzp.on("payment.failed", function (response: any) {
        console.log("FAILED:", response);
      });
    } catch (err) {
      console.log(err);

    }
  }
  const placeorder = async (): Promise<void> => {
    if (!address.fullname || !address.address || !address.city || !address.number || !address.pincode || !address.state) {
      return alert('please fill all address fields')
    }
    if (paymentoption === '') {
      return alert('chosse payment method')
    }
    await onlineCheckout();
    console.log(address);
    console.log(paymentoption);


  }
  return (
    <>
      <div className='p-4  w-full flex flex-col justify-center'>
        <div className='flex pl-10 mb-3 gap-1 flex-col w-full justify-start'>
          <h1 className='text-4xl font-[500]'>Checkout</h1>
          <p className='text-xl text-gray-500'>Complete your order details below.</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-6 px-4 lg:px-10">
          <div className="w-full lg:w-[60%]">
            <div className='w-full p-4 rounded-xl bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] '>
              <div className='flex items-center gap-1 w-full  border-gray-400 pb-1 '>
                <img className='h-[25px] w-auto' src={trucklogo} alt="trucklogo" />
                <h1 className='text-[20px] font-[500]'>Delivery Address</h1>
              </div>

              <form className='pt-3'>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setaddress(prev => ({ ...prev, fullname: e.target.value })) }} label='Full Name' placeholder='Enter your name' type='text' />
                  <Input onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setaddress(prev => ({ ...prev, number: e.target.value })) }} label='Phone Number' placeholder='Enter your number' type='text' />
                </div>
                <div>
                  <p>Address</p>
                  <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setaddress(prev => ({ ...prev, address: e.target.value })) }} placeholder='1/33 Main Road' className='w-full  rounded-md border bg-gray-50 border-gray-200 p-1 pl-3 mb-3 pb-10 py-2 outline-none focus:border-black' type='text' />
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <Input onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setaddress(prev => ({ ...prev, pincode: e.target.value })) }} placeholder='Enter Pincode' label='Pincode' type='text' />
                  <Input onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setaddress(prev => ({ ...prev, city: e.target.value })) }} placeholder='Enter City' label='City' type='text' />
                  <Input onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setaddress(prev => ({ ...prev, state: e.target.value })) }} placeholder='Enter State' label='State' type='text' />
                </div>
              </form>
            </div>
            <div className='w-full mt-8 rounded-xl p-3 bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
              <div className='flex gap-1  pb-1  border-gray-400'>
                <img src={cardlogo} alt="cardlogo" />
                <h1 className='font-[500] text-[20px]'>Payment Option</h1>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-1 justify-center w-full">

                <label className="flex items-center gap-3 cursor-pointer">


                  <input
                    onChange={() => { setpaymentoption("cod") }}
                    type="radio"
                    name="payment"
                    className="peer hidden"
                  />


                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center 
                  peer-checked:border-black transition">


                    <div className="w-2.5 h-2.5 rounded-full bg-black scale-0 
                    peer-checked:scale-100 transition-transform duration-200">
                    </div>

                  </div>


                  <span className="text-gray-700 font-medium">
                    <span className='text-black font-[500]'>Cash on Delivery</span> <br />
                    <span>Pay when your order arrives.</span>
                  </span>
                  <div>
                    <img className='w-32' src={cod} alt="cod" />
                  </div>

                </label>
                <label className="flex items-center gap-3 cursor-pointer">


                  <input
                    onChange={() => { setpaymentoption("online") }}
                    type="radio"
                    name="payment"
                    className="peer hidden"
                  />


                  <div className="w-5 h-5 rounded-full border-2 border-gray-400 flex items-center justify-center 
                  peer-checked:border-black transition">


                    <div className="w-2.5 h-2.5 rounded-full bg-black scale-0 
                    peer-checked:scale-100 transition-transform duration-200">
                    </div>

                  </div>


                  <span className="text-gray-700 font-medium">
                    <span className='text-black font-[500]'>Pay Online (Razorpay)</span> <br />
                    <span>Credit/Debit Cards, UPI, NetBanking.</span>
                  </span>
                  <div>
                    <img className='w-25' src={payonline} alt="payonline" />
                  </div>

                </label>
              </div>
            </div>
          </div>
          <div className='md:flex md:justify-center'>
            <div className="w-full lg:w-[40%]  lg:sticky lg:top-28 px-2 lg:px-0">
              <div className=' lg:w-[390px] md:w-[230px] h-max rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white p-5'>
                <h1 className='text-2xl font-[500] pb-5'>Order Summary</h1>
                <div className='w-full flex  flex-col gap-3 pb-7 border-b-1'>
                  <div className=' flex justify-between'>
                    <p className='font-[500] '>Sub Total</p> <p className='font-[500]' >₹ {subtotal}</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-[500] '>Shipping</p> <p className='text-green-700 font-[500]'>Free</p>
                  </div>
                  <div className='flex justify-between'>
                    <p className='font-[500] '>Discount</p> <p className='text-red-600 font-[500]'>- ₹ {discount}</p>
                  </div>
                  <div className=' flex justify-between'>
                    <p className='font-[500]'>Estimated Tax</p> <p className='font-[500]' >₹ {tax}</p>
                  </div>

                </div>
                <div className=' w-full flex justify-between pt-3 pb-7'>
                  <p className='font-[500]'>Total</p> <p className='font-[500]'>₹ {totalvalue}</p>
                </div>
                <div className='w-full flex flex-col gap-4'>
                  <button onClick={placeorder} className='w-full bg-black text-white font-400 px-2 py-2 rounded-xl'>Place Order</button>
                  <button onClick={() => { navigate('/my-cart') }} className='w-full bg-white text-black outline-1 font-400 px-2 py-2 rounded-xl'>Cancel</button>
                </div>
                <div className='w-full text flex flex-col items-center pt-5'>
                  <p className='font-[400]'>We Accept</p>
                  <div className='flex gap-5 pt-3'>
                    <img src={card} alt="card" />
                    <img src={upi} alt="upi" />
                    <img src={bank} alt="bank" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Checkout