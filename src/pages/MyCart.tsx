import  { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Cart_Card from '../components/Cart_Card'
import card from '../assets/card.png'
import bank from '../assets/bank.png'
import upi from '../assets/upi.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const MyCart = () => {
    const navigate = useNavigate()
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
    const [cart, setcart] = useState<cartProps[]>([]);

    const fetchCart = async () => {
        try {

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


    const deleteCart = async (productID: number): Promise<void> => {
        try {
            const res = await axios.delete(`https://cartify-backend-kzss.onrender.com/buyer/delete-cart/${productID}`)
            console.log(res.data);
            await fetchCart()

        } catch (err) {
            console.log(err);

        }
    }
    const updateQuantity = async(productID:number,type:"inc" | "dec"):Promise<void> => {
        const res = await axios.patch(`https://cartify-backend-kzss.onrender.com/buyer/update-quantity/${productID}`,{
            type,
            userid:cart[0].user_id
        })
        fetchCart();
        console.log(res.data);
        
        
    }
    useEffect(() => {
        fetchCart();
    }, [])
    
    const subtotal = cart.reduce((acc, curr) => acc + curr.product_price * curr.quantity, 0);

    const discount = 100;
    const tax = 50;
    const shipping = 0;

    const totalvalue = subtotal - discount + tax + shipping;
    return (
        <>
            <Navbar />
            <div className='w-full p-10 lg:pl-20 '>
                <div className='w-full pb-5 lg:pl-10 '>
                    <h1 className='text-4xl font-[600] pb-2'>My Cart</h1>
                    <p className='text-xl text-gray-500'>You have {cart.length} items in your Cart</p>
                </div>
                <div className='w-full flex flex-col md:flex-row md:gap-10 lg:gap-25 h-[650px]  md:pl-10 md:pr-10 '>
                    <div className='md:w-[60%] bg-white md:overflow-y-auto scrollbar-none  flex-col p-2'>
                        {cart.map((item) => (
                            <div key={item.product_id}>
                                <Cart_Card quantity={item.quantity} onclickdec={() => updateQuantity(item.product_id,'dec')} onclickinc={() => updateQuantity(item.product_id,'inc')} img={`https://cartify-backend-kzss.onrender.com/uploads/${item.product_img}`} p_name={item.product_name} price={item.product_price} onclick={() => { deleteCart(item.product_id) }} />
                            </div>
                        ))}




                    </div>
                    <div style={{display:cart.length>0? "block" : "none"}} className='flex-1 md:pl-10 md:sticky md:top-35  bg-white h-[500px] '>
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
                            <div className='w-full'>
                                <button onClick={()=>{ navigate('/checkout') }} className='w-full bg-black text-white font-400 px-2 py-2 rounded-xl'>Proceed to Checkout</button>
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
        </>
    )
}

export default MyCart