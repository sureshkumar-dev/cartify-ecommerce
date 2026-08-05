import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderDetails = () => {
    const navigate = useNavigate()
    return (
        <>
            <div className=" absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-lg">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900">
                        Order Details
                    </h2>
                    <button onClick={()=> { navigate('/my-orders')}} className="text-gray-500 hover:pointer hover:text-black">✕</button>
                </div>

                <div className="flex gap-4">
                    <img
                        src="https://picsum.photos/seed/product1/200/200"
                        alt="Product"
                        className="h-24 w-24 rounded-xl object-cover"
                    />

                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900">
                            Wireless Headphones
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            #ORD123456
                        </p>

                        <div className="mt-3 space-y-1 text-sm text-gray-600">
                            <p>Qty : 1</p>
                            <p>₹1,299</p>
                            <p className="font-medium text-green-600">
                                Delivered
                            </p>
                            <p>29 Jul 2026</p>
                        </div>
                    </div>
                </div>

                <button className="mt-6 w-full rounded-xl bg-black py-3 text-sm font-medium text-white transition hover:bg-gray-900">
                    Download Invoice
                </button>
            </div>
        </>
    )
}

export default OrderDetails