import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import drop from '../assets/drop.png';
import Order_card from '../components/Order_card';
import Footer from '../components/Footer';

const MyOrders = () => {
    const [orderSort, setorederSort] = useState<string>('All Orders')
    const [SortOpen, setSortOpen] = useState<boolean>(false)

    return (
        <>
            <Navbar />
            <div className='w-full pl-10 pr-10  lg:pl-25 pt-10 lg:pr-25'>
                <div className='w-full flex justify-between'>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-2xl md:text-5xl font-[500]'>My Orders</h1>
                        <p className='hidden md:block   md:text-2xl text-gray-500'>View And Track Your Orders</p>
                    </div>
                    <div className='pt-0 md:pt-[40px] w-max relative'>
                        <button onClick={() => { SortOpen ? setSortOpen(false) : setSortOpen(true) }} className='px-2 py-1 border-1 border-gray-600 rounded-md flex items-center'>{orderSort} <img src={drop} alt="drop" /></button>
                        <div style={{ display: SortOpen ? "block" : "none" }} className='absolute top-[87%]  w-full'>
                            <ul onClick={() => { setSortOpen(false) }} className='text-center  border-1 '>
                                <li onClick={(e) => setorederSort(e.currentTarget.textContent)} className='border-b-1 hover:bg-blue-700'>All Orders</li>
                                <li onClick={(e) => setorederSort(e.currentTarget.textContent)} className='border-b-1 hover:bg-blue-700'>Delivered</li>
                                <li onClick={(e) => setorederSort(e.currentTarget.textContent)} className=' hover:bg-blue-700'>Pending</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='w-full flex flex-col gap-12 pb-20 pt-10 md:pt-20'>
                    <Order_card
                        img={drop}
                        p_name="Nike Air Max Sneakers"
                        order_id="#DEL763S"
                        date="2025-DEC-27"
                        quantity={1}
                        total={4999}
                        status="Shipped"
                    />

                    <Order_card
                        img="https://picsum.photos/seed/watch/800/800"
                        p_name="Premium Smart Watch"
                        order_id="#DEL829K"
                        date="2025-DEC-25"
                        quantity={2}
                        total={5998}
                        status="Delivered"
                    />

                    <Order_card
                        img="https://picsum.photos/seed/headphones/800/800"
                        p_name="Wireless Headphones"
                        order_id="#DEL451P"
                        date="2025-DEC-23"
                        quantity={1}
                        total={1899}
                        status="Pending"
                    />
                    <Order_card
                        img="https://picsum.photos/seed/shoes/800/800"
                        p_name="Nike Air Max Sneakers"
                        order_id="#DEL763S"
                        date="2025-DEC-27"
                        quantity={1}
                        total={4999}
                        status="Shipped"
                    />

                    <Order_card
                        img="https://picsum.photos/seed/watch/800/800"
                        p_name="Premium Smart Watch"
                        order_id="#DEL829K"
                        date="2025-DEC-25"
                        quantity={2}
                        total={5998}
                        status="Delivered"
                    />

                    <Order_card
                        img="https://picsum.photos/seed/headphones/800/800"
                        p_name="Wireless Headphones"
                        order_id="#DEL451P"
                        date="2025-DEC-23"
                        quantity={1}
                        total={1899}
                        status="Pending"
                    />
                </div>
                


            </div>
            <Footer />
        </>
    )
}

export default MyOrders