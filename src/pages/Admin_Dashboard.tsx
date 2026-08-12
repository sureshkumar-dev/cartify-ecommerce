import  { useEffect, useState } from 'react'
import LogOutIcon from '../assets/seller/logout.png'
import { Users, Store, PackageCheck, ShoppingBag } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin_Dashboard = () => {
    const navigate = useNavigate()
    interface Product {
        product_id: number;
        seller_id: number;
        product_name: string;
        product_desc: string;
        product_price: number;
        product_stock: number;
        category: string;
        product_img: string;
        status: "pending" | "approved" | "rejected";
        created_at: string;
        updated_at: string;
        storename: string;
    }
    type Users = {
        username: string,
        email: string,
        id: number
    }
    type Sellers = {
        id: number,
        storename: string,
        total_products: number
    }
    type Request = "pending" | "approved" | "rejected"
    const [users, setusers] = useState<Users[]>([])
    const [products, setproducts] = useState<Product[]>([]);
    const [sellers, setsellers] = useState<Sellers[]>([])
  
    const stats = [
        { title: "Total Users", value: users.length, icon: Users },
        { title: "Total Sellers", value: sellers.length, icon: Store },
        { title: "Pending Requests", value: products.length, icon: PackageCheck },
        { title: "Total Orders", value: "45,210", icon: ShoppingBag },
    ];







    const fetchProductRequests = async (): Promise<void> => {
        const res = await axios.get('https://cartify-backend-kzss.onrender.com/admin/product-requests')
        console.log(res.data);
        setproducts(res.data.products)


    }
    const fetchUsers = async (): Promise<void> => {
        const res = await axios.get('https://cartify-backend-kzss.onrender.com/admin/fetch-users')
        console.log(res.data);
        setusers(res.data.users)


    }
    const fetchSellers = async (): Promise<void> => {
        const res = await axios.get('https://cartify-backend-kzss.onrender.com/admin/fetch-sellers')
        console.log(res.data);
        setsellers(res.data.sellers)

    }
    const manageRequests = async (id: number, status: Request): Promise<void> => {
        const res = await axios.post('https://cartify-backend-kzss.onrender.com/admin/manage-requests', {
            id: id,
            status: status
        })
        console.log(res.data);

    }
    useEffect(() => {

        fetchUsers();
        fetchSellers();
    }, [])
    useEffect(() => {
        fetchProductRequests()
    }, [products])
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto max-w-7xl">



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





                <div className="mt-8 grid gap-6 lg:grid-cols-2">



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-5 text-2xl font-semibold">
                            Sellers
                        </h2>

                        <div className="h-[350px] space-y-4 overflow-y-auto pr-2">

                            {sellers.map((seller) => (

                                <div
                                    key={seller.id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {seller.storename}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Products : {seller.total_products}
                                        </p>

                                    </div>

                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium 
                                            ? "bg-green-100 text-green-700"
                                            : "bg-yellow-100 text-yellow-700"
                                            }`}
                                    >
                                        ACTIVE
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>



                    <div className="rounded-2xl bg-white p-6 shadow">

                        <h2 className="mb-5 text-2xl font-semibold">
                            Registered Users
                        </h2>

                        <div className="h-[350px] space-y-4 overflow-y-auto pr-2">

                            {users.map((user) => (

                                <div
                                    key={user.id}
                                    className="flex items-center justify-between rounded-xl border p-4"
                                >

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {user.username}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Email : {user.email}
                                        </p>

                                    </div>

                                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                        ACTIVE
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

                <div className="rounded-2xl bg-white mt-10 p-6 shadow">

                    <h2 className="mb-5 text-2xl font-semibold">
                        Pending Product Requests
                    </h2>

                    <div className="h-[430px] space-y-4 overflow-y-auto pr-2">

                        {products?.map((item) => (

                            <div
                                key={item.product_id}
                                className="flex items-center justify-between rounded-xl border p-4"
                            >

                                <div className="flex items-center gap-4">

                                    <img
                                        src={`https://cartify-backend-kzss.onrender.com/uploads/${item.product_img}`}
                                        className="h-20 w-20 rounded-lg object-cover"
                                        alt=""
                                    />

                                    <div>

                                        <h3 className="font-semibold text-lg">
                                            {item.product_name}
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Seller : {item.storename}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            Category : {item.category}
                                        </p>

                                        <p className="font-semibold text-green-600">
                                            ₹ {item.product_price}
                                        </p>

                                    </div>

                                </div>

                                <select onChange={(e) => { manageRequests(item.product_id, e.target.value as Request) }} className="rounded-lg border px-4 py-2 outline-none">

                                    <option value='pending'>Pending</option>

                                    <option value='approved' >Approved</option>

                                    <option value='rejected' >Rejected</option>

                                </select>

                            </div>

                        ))}

                    </div>

                </div>


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