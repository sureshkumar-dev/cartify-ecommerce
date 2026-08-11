import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
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
    OrderID: string,
    order_date: string
};

const OrderDetails = () => {
    const [orderdetails, setorderdetails] = useState<OrderItem[]>([])
    const navigate = useNavigate()
    const { id } = useParams()
    console.log(id);

    const fetchOrderDetails = async (): Promise<void> => {
        try {
            const res = await axios.post(`http://localhost:3000/buyer/orderdetails/${id}`)
            console.log(res.data);
            setorderdetails(res.data.products)

        } catch (err) {

        }
    }
    useEffect(()=>{
        fetchOrderDetails();
    },[])

    return (
        <>
            {orderdetails.map((item) => (
                <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">



                    <div className="mb-5 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Order Details
                        </h2>
                        <button onClick={() => { navigate('/my-orders') }} className="text-gray-500 hover:pointer hover:text-black">✕</button>
                    </div>

                    <div className="flex gap-4">
                        <img
                            src={`http://localhost:3000/uploads/${item.product_img}`}
                            alt="Product"
                            className="h-24 w-24 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                            <h3 className="font-medium text-gray-900">
                               {item.product_name}
                            </h3>

                            <p className="mt-1 text-sm text-gray-500">
                                {item.OrderID}
                            </p>

                            <div className="mt-3 space-y-1 text-sm text-gray-600">
                                <p>Qty : {item.quantity}</p>
                                <p>₹{item.price}</p>
                                <p className="font-medium text-green-600">
                                    {item.delivery_status}
                                </p>
                                <p>{item.order_date}</p>
                            </div>
                        </div>
                    </div>

                    <button className="mt-6 w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-900">
                        Download Invoice
                    </button>
                </div>
            ))}
        </>
    )
}

export default OrderDetails