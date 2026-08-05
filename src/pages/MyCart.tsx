import React from 'react'
import Navbar from '../components/Navbar'
import Cart_Card from '../components/Cart_Card'
import card from '../assets/card.png'
import bank from '../assets/bank.png'
import upi from '../assets/upi.png'
const MyCart = () => {
    return (
        <>
            <Navbar />
            <div className='w-full p-10 lg:pl-20 '>
                <div className='w-full pb-5 lg:pl-10 '>
                    <h1 className='text-4xl font-[600] pb-2'>My Cart</h1>
                    <p className='text-xl text-gray-500'>You have 3 items in your Cart</p>
                </div>
                <div className='w-full flex flex-col md:flex-row md:gap-10 lg:gap-25 h-[650px]  md:pl-10 md:pr-10 '>
                    <div className='md:w-[60%] bg-white md:overflow-y-auto scrollbar-none  flex-col p-2'>
                        <Cart_Card
                            img="https://picsum.photos/seed/product1/800/800"
                            p_name="Wireless Headphones"
                            price={2499}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product2/800/800"
                            p_name="Smart Watch"
                            price={3999}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product3/800/800"
                            p_name="Gaming Mouse"
                            price={1499}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product4/800/800"
                            p_name="Mechanical Keyboard"
                            price={3299}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product5/800/800"
                            p_name="Bluetooth Speaker"
                            price={1899}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product6/800/800"
                            p_name="Laptop Backpack"
                            price={1299}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product7/800/800"
                            p_name="USB-C Hub"
                            price={999}
                        />

                        <Cart_Card
                            img="https://picsum.photos/seed/product8/800/800"
                            p_name="Portable SSD"
                            price={5499}
                        />

                    </div>
                    <div className='flex-1 md:pl-10 md:sticky md:top-35  bg-white h-[500px] '>
                        <div className=' lg:w-[390px] md:w-[230px] h-max rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white p-5'>
                            <h1 className='text-2xl font-[500] pb-5'>Order Summary</h1>
                            <div className='w-full flex  flex-col gap-3 pb-7 border-b-1'>
                                <div className=' flex justify-between'>
                                    <p className='font-[500] '>Sub Total</p> <p className='font-[500]' >₹ 1000</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-[500] '>Shipping</p> <p className='text-green-700 font-[500]'>Free</p>
                                </div>
                                <div className='flex justify-between'>
                                    <p className='font-[500] '>Discount</p> <p className='text-red-600 font-[500]'>- ₹ 100</p>
                                </div>
                                <div className=' flex justify-between'>
                                    <p className='font-[500]'>Estimated Tax</p> <p className='font-[500]' >₹ 50</p>
                                </div>

                            </div>
                            <div className=' w-full flex justify-between pt-3 pb-7'>
                                <p className='font-[500]'>Total</p> <p className='font-[500]'>₹ 50</p>
                            </div>
                            <div className='w-full'>
                                <button className='w-full bg-black text-white font-400 px-2 py-2 rounded-xl'>Proceed to Checkout</button>
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