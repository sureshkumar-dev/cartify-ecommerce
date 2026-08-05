import React from 'react'
import LogOutIcon from '../assets/seller/logout.png'
import { Users, Store, PackageCheck, ShoppingBag, Eye, Check, X } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Admin_Dashboard = () => {
    const navigate = useNavigate()
    const stats = [
        { title: "Total Users", value: "12,450", icon: Users },
        { title: "Total Sellers", value: "842", icon: Store },
        { title: "Pending Requests", value: "28", icon: PackageCheck },
        { title: "Total Orders", value: "45,210", icon: ShoppingBag },
    ];

    const pending = [
        { product: "NuType Mechanical Keyboard", seller: "Nexus Peripherals", category: "Electronics", price: "$249", date: "Oct 12, 2023" },
        { product: "Heritage Leather Duffel", seller: "Atlas Goods", category: "Travel", price: "$450", date: "Oct 11, 2023" },
    ];

    const sellers = [
        { name: "Urban Essentials", products: 154, status: "Active" },
        { name: "Tech Hub Systems", products: 42, status: "On Hold" },
        { name: "Lumina Decor", products: 211, status: "Active" },
    ];

    const users = [
        { name: "Sarah Jenkins", joined: "Oct 14, 2023", status: "Customer" },
        { name: "Marcus Vong", joined: "Oct 14, 2023", status: "Customer" },
        { name: "Elena Rodriguez", joined: "Oct 13, 2023", status: "VIP" },
    ];
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
                        <p className="mt-2 text-gray-500">
                            Manage sellers, products, users and orders.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate("/auth")}
                        className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 shadow hover:bg-gray-50"
                    >
                        <img src={LogOutIcon} className="h-5" alt="" />
                        Logout
                    </button>
                </div>

                {/* Stats */}

                <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-2xl bg-white p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-400">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-2 text-3xl font-bold">
                                        {item.value}
                                    </h2>
                                </div>

                                <div className="rounded-xl bg-black p-4 text-white">
                                    <item.icon size={26} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pending Products */}

                <div className="rounded-2xl bg-white p-6 shadow">

                    <h2 className="mb-5 text-2xl font-semibold">
                        Pending Product Requests
                    </h2>

                    <div className="h-[430px] space-y-4 overflow-y-auto pr-2">

                        {pending.map((item) => (

                            <div
                                key={item.product}
                                className="flex items-center justify-between rounded-xl border p-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src="https://placehold.co/90x90"
                                        className="h-20 w-20 rounded-lg object-cover"
                                        alt=""
                                    />

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {item.product}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Seller : {item.seller}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Category : {item.category}
                                        </p>

                                        <p className="font-semibold text-green-600">
                                            {item.price}
                                        </p>

                                    </div>

                                </div>

                                <select className="rounded-lg border px-4 py-2 outline-none">

                                    <option>Pending</option>

                                    <option>Approved</option>

                                    <option>Rejected</option>

                                </select>

                            </div>

                        ))}

                    </div>

                </div>
                {/* Sellers & Users */}

                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                    {/* Sellers */}

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-5 text-2xl font-semibold">
                            Sellers
                        </h2>

                        <div className="h-[350px] space-y-4 overflow-y-auto pr-2">

                            {sellers.map((seller) => (

                                <div
                                    key={seller.name}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {seller.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Products : {seller.products}
                                        </p>

                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium ${seller.status === "Active"
                                                ? "bg-green-100 text-green-700"
                                                : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        {seller.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                    {/* Users */}

                    <div className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-5 text-2xl font-semibold">
                            Registered Users
                        </h2>

                        <div className="h-[350px] space-y-4 overflow-y-auto pr-2">

                            {users.map((user) => (

                                <div
                                    key={user.name}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {user.name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Joined : {user.joined}
                                        </p>

                                    </div>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                        {user.status}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                {/* Orders */}

                <div className="mt-8 rounded-2xl bg-white p-6 shadow">

                    <h2 className="mb-5 text-2xl font-semibold">
                        Recent Orders
                    </h2>

                    <div className="h-[350px] space-y-4 overflow-y-auto pr-2">

                        {[1, 2, 3, 4, 5].map((item) => (

                            <div
                                key={item}
                                className="flex items-center justify-between rounded-xl border p-4"
                            >

                                <div>

                                    <h3 className="font-semibold">
                                        Order #ORD-100{item}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        Customer : Suresh Kumar
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        ₹2,499
                                    </p>

                                </div>

                                <select className="rounded-lg border px-4 py-2 outline-none">

                                    <option>Pending</option>

                                    <option>Approved</option>

                                    <option>Rejected</option>

                                </select>

                            </div>

                        ))}

                    </div>

                </div>

            </div>
        </div>
    );
}


export default Admin_Dashboard