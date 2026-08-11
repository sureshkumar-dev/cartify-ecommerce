import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import drop from '../assets/drop.png';
import Order_card from '../components/Order_card';
import Footer from '../components/Footer';
import axios from 'axios';
import { header } from 'framer-motion/m';
type OrderItem = {
    id: number;
    user_id: number;
    product_id: number;
    product_name: string;
    product_img: string;
    storename: string;
    price: number;
    quantity: number;
    delivery_status: string;
    OrderID:string,
    order_date:string
};
const MyOrders = () => {
    const [orderSort, setorederSort] = useState<string>('All Orders')
    const [SortOpen, setSortOpen] = useState<boolean>(false)
    const [order, setorder] = useState<OrderItem[]>([])
    const fetchCart = async (): Promise<void> => {
        const token = localStorage.getItem('token')
        const res = await axios.post('http://localhost:3000/buyer/fetchOrders',
            { token }
        )
        console.log(res.data);
        setorder(res.data.orders)

    }
    useEffect(() => {
        fetchCart();
    })
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
                    {order.map((item) => (
                        <Order_card
                            img={`http://localhost:3000/uploads/${item.product_img}`}
                            p_name={item.product_name}
                            order_id={item.OrderID}
                            date={item.order_date}
                            quantity={item.quantity}
                            total={item.price}
                            status={item.delivery_status}
                            product_id={item.product_id}
                        />
                    ))}



                </div>



            </div>
            <Footer />
        </>
    )
}

export default MyOrders