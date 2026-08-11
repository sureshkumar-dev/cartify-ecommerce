import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import profile from '../assets/seller/profile.png'
import logout from '../assets/seller/logout.png'
import money from '../assets/seller/money.png';
import bag from '../assets/seller/bag.png';
import order from '../assets/seller/parcel.png';
import pending from '../assets/seller/pending.png';
import drop from '../assets/drop.png'
import { useNavigate } from 'react-router-dom';


const Seller_Dashboard = () => {
    const navigate = useNavigate()

    const [shopname, setshopname] = useState<string>();
    const [shopmail, setshopmail] = useState<string>();
    type Product = {
        product_id: string;
        product_img: string;
        product_name: string;
        product_desc: string;
        product_price: string;
        product_stock: number;
        seller_id: number;
        created_at: string;
        updated_at: string;
        category: string;
        status: 'pending' | 'rejected' | 'approved';
    }
    const [myproducts, setmyproducts] = useState<Product[]>()
    const logoutfn = () => {
        localStorage.removeItem('sellertoken')
        navigate('/auth')
    }
    const fetchProfile = async (): Promise<void> => {
        try {
            const token = localStorage.getItem('sellertoken')
            const res = await axios.get('http://localhost:3000/fetch-seller', {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            console.log(res.data.user);
            setshopname(res.data.sellername)
            setshopmail(res.data.seller.email)
        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        fetchProfile();
    }, [])
    const [cat, setcat] = useState<boolean>(false)
    const [category, setcategory] = useState<string>('Select Category');
    const [addProduct, setaddproduct] = useState<boolean>(true)
    const [manageProduct, setmanageProduct] = useState<boolean>(false)
    const [manageOrder, setmanageOrder] = useState<boolean>(false)
    const [p_name, setp_name] = useState<string>("");
    const [p_desc, setp_desc] = useState<string>("");
    const [p_category, setp_category] = useState<string>("");
    const [p_price, setp_price] = useState<string>("");
    const [p_img, setp_img] = useState<File | null>(null);
    const productAdd = async (): Promise<void> => {
        if (!p_name || !p_desc || !p_price || !p_category || !p_img) {
            return alert('Fill All The Fields')
        }
        const fd = new FormData();
        console.log(p_name, p_img, p_desc, p_category, p_price);

        fd.append('ProductName', p_name)
        fd.append('ProductDesc', p_desc)
        fd.append('ProductPrice', p_price)
        fd.append('ProductImage', p_img)
        fd.append("ProductCategory", p_category);
        for (const [key, value] of fd.entries()) {
            console.log(key, value);
        }
        const token = localStorage.getItem('sellertoken')
        if (!token) {
            return alert('no token found')
        }
        const res = await axios.post('http://localhost:3000/seller/add-product',
            fd,
            {
                headers: {
                    Authorization: `Bearer ${token!}`
                }
            }
        )

        console.log(res.data);
        fetchproducts();

    }
    const fetchproducts = async (): Promise<void> => {
        const token = localStorage.getItem('sellertoken')
        const res = await axios.post('http://localhost:3000/seller/fetch-products', {}, {
            headers: {

                authorization: `Bearer ${token!}`

            }
        })
        setmyproducts(res.data.products)
    }
    useEffect(() => {
        fetchproducts();
    }, [myproducts])
    const deleteItem = async (id: string) => {
        
        const res = await axios.delete(`http://localhost:3000/seller/product-delete/${id}`)
        console.log(res);
        
        fetchproducts();
    }
    return (
        <>
            <nav className='w-full h-max  flex mx-auto justify-center shadow-[0_2px_12px_rgba(0,0,0,0.06)]  p-1 '>
                <div className='w-full md:max-w-[1350px] mx-auto flex justify-between items-center md:pl-5 md:pr-5 lg:pl-0 lg:p-1  bg-white'>
                    <div className='flex gap-2'>
                        <img className='h-[40px] w-auto' src={profile} alt="profile logo" />
                        <div className='flex flex-col'>
                            <h1 className='font-[500] '>{shopname}</h1>
                            <p className='text-[12px]'>{shopmail}</p>
                        </div>
                    </div>
                    <div onClick={logoutfn} className='flex pr-5 md:pr-0 gap-2'>
                        <img className='h-[25px] w-auto' src={logout} alt="logout" />
                        <p className='text-gray-400'>Logout</p>
                    </div>
                </div>
            </nav>
            <section className='w-full md:pl-5 md:pr-5 lg:pl-0 lg:pr-0 pt-8 flex mx-auto'>
                <div className='mx-auto w-[360px] md:w-[1350px]'>
                    <div className='flex flex-col gap-1'>
                        <h1 className='md:text-3xl lg:text-4xl font-[500]'>Seller Dashboard</h1>
                        <p className='md:text-md lg:text-xl text-gray-500'>Welcome back! Here's what's happening with your store today.</p>
                    </div>
                    <div className=' grid grid-cols-1 md:grid-cols-4 gap-7 pt-10 pb-8 w-full'>
                        <div className='bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[140px]'>
                            <div className='w-full h-full p-4 flex flex-col gap-3 justify-center'>
                                <img className='h-[30px] w-[30px]' src={money} alt="money" />
                                <h1 className='md:text-xl lg:text-3xl font-[500]'>₹ 12000</h1>
                                <p className='md:text-md lg:text-2xl text-gray-600 font-[400]'>Total Revenue</p>
                            </div>
                        </div>
                        <div className='bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[140px]'>
                            <div className='w-full h-full p-4 flex flex-col gap-3 justify-center'>
                                <img className='h-[30px] w-[30px]' src={bag} alt="money" />
                                <h1 className='md:text-xl lg:text-3xl font-[500]'>100</h1>
                                <p className='md:text-md  lg:text-2xl text-gray-600 font-[400]'>Total Orders</p>
                            </div>
                        </div>
                        <div className='bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[140px]'>
                            <div className='w-full h-full p-4 flex flex-col gap-3 justify-center'>
                                <img className='h-[30px] w-[30px]' src={order} alt="money" />
                                <h1 className=' md:text-xl lg:text-3xl font-[500]'>12</h1>
                                <p className=' md:text-md  lg:text-2xl text-gray-600 font-[400]'>Total Products</p>
                            </div>
                        </div>
                        <div className='bg-white rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] h-[140px]'>
                            <div className='w-full h-full p-4 flex flex-col gap-3 justify-center'>
                                <img className='h-[30px] w-[30px]' src={pending} alt="money" />
                                <h1 className='md:text-xl lg:text-3xl font-[500]'>12</h1>
                                <p className='md:text-md  lg:text-2xl text-gray-600 font-[400]'>Pending Orders</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <h1 className='text-3xl font-[500]'>Quick Actions</h1>
                    </div>
                    <div className='grid md:grid-cols-3 gap-5 pt-5'>
                        <button onClick={() => { (setaddproduct(true), setmanageProduct(false), setmanageOrder(false)) }} style={{ backgroundColor: addProduct ? "black" : "white", color: addProduct ? "white" : "black" }} className='border-2 text-black font-[500] rounded-md py-2'>Add Products</button>
                        <button onClick={() => { (setaddproduct(false), setmanageProduct(true), setmanageOrder(false)) }} style={{ backgroundColor: manageProduct ? "black" : "white", color: manageProduct ? "white" : "black" }} className='border-2 text-black font-[500] rounded-md py-2'>Manage Products</button>
                        <button onClick={() => { (setaddproduct(false), setmanageProduct(false), setmanageOrder(true)) }} style={{ backgroundColor: manageOrder ? "black" : "white", color: manageOrder ? "white" : "black" }} className='border-2 text-black font-[500] rounded-md py-2'>Manage Orders</button>
                    </div>
                    <div className='w-full pt-15 pb-8 flex justify-center '>
                        <div style={{ display: addProduct ? "block" : "none" }} className='  bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl w-[480px] h-max p-4'>
                            <div className='w-full flex  pb-4 justify-between'>
                                <h1 className='text-2xl font-[500]'>Add New Product</h1>
                                <h1 className='w-5 text-2xl font-[500]'> </h1>
                            </div>
                            <div className='w-full '>
                                <p className='pb-3'>Product Name</p>
                                <input value={p_name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setp_name(e.target.value) }} className='w-full border-black-1 outline-1 pl-3 rounded-sm py-1 mb-3 ' placeholder='Enter Product Name' type="text" />
                                <p className='pb-3'>Description</p>
                                <input value={p_desc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setp_desc(e.target.value) }} className='w-full border-black-1 outline-1 pl-3 rounded-sm py-1 pb-10 mb-3 ' placeholder='Enter Product Description..' type="text" />
                                <div className='w-full flex mb-3 gap-3'>
                                    <div className='w-1/2 '>
                                        <p className='pb-3'>Price (₹)</p>
                                        <input value={p_price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setp_price(e.target.value) }} className='w-full border-black-1 outline-1 pl-3 rounded-sm py-1 ' placeholder='Product Price' type="text" />

                                    </div>
                                    <div className='w-1/2 '>
                                        <p className='pb-3'>Category</p>
                                        <div className='w-full  relative'>
                                            <button onClick={() => { !cat ? setcat(true) : setcat(false) }} className=' flex justify-between items-center pl-3 py-0.5 border-black-1 w-full outline-1 rounded-sm  '>{category} <img src={drop} alt="drop" /></button>
                                            <div style={{ display: cat ? "block" : "none" }}>
                                                <ul onClick={() => setcat(false)} className='w-full absolute bg-white border-1 top-[100%] text-center'>
                                                    <li onClick={(e: React.MouseEvent<HTMLElement>) => { setp_category(e.currentTarget.textContent); setcategory(e.currentTarget.textContent) }} className=' border-b-1 hover:bg-[#155eef]'>Fashions</li>
                                                    <li onClick={(e: React.MouseEvent<HTMLElement>) => { setp_category(e.currentTarget.textContent); setcategory(e.currentTarget.textContent) }} className=' border-b-1 hover:bg-[#155eef]'>Electronics</li>
                                                    <li onClick={(e: React.MouseEvent<HTMLElement>) => { setp_category(e.currentTarget.textContent); setcategory(e.currentTarget.textContent) }} className=' border-b-1 hover:bg-[#155eef]'>Home & Living</li>
                                                    <li onClick={(e: React.MouseEvent<HTMLElement>) => { setp_category(e.currentTarget.textContent); setcategory(e.currentTarget.textContent) }} className=' hover:bg-[#155eef]'>Personal Care</li>
                                                </ul>
                                            </div>
                                        </div>


                                    </div>

                                </div>
                                <div className='w-full'>
                                    <p className='pb-2'>Product Image</p>
                                    <label className="flex h-48 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 transition">
                                        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) { setp_img(e.target.files[0]) } }} type="file" accept="image/*" className="hidden" />
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-gray-700">Upload Image</p>
                                            <p className="mt-1 text-xs text-gray-500">PNG, JPG, JPEG</p>
                                        </div>
                                    </label>
                                </div>
                                <div className='w-full flex justify-end mt-4'>
                                    <div className='flex gap-2'>
                                        <button className='px-2 outline-1 rounded-xl py-1 '>Cancel</button>
                                        <button onClick={productAdd} className='px-2 rounded-xl py-1 bg-black text-white'>Add Product</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: manageProduct ? "block" : "none" }} className="hidden space-y-3 max-h-[420px] w-[400px] overflow-y-auto">
                            {myproducts?.map((item) => (
                                <div
                                    key={item.product_id}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                                >
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`http://localhost:3000/uploads/${item.product_img}`}
                                            alt="Product"
                                            className="h-14 w-14 rounded-md object-cover"
                                        />

                                        <div>
                                            <h3 className="text-sm font-semibold">{item.product_name}</h3>
                                            <p className="text-xs text-gray-500">{item.category}</p>
                                            <p className="text-sm font-medium">₹{item.product_price}</p>
                                        </div>
                                    </div>

                                    <button onClick={() => { deleteItem(item.product_id) }} className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                                        Delete
                                    </button>
                                </div>

                            ))}
                        </div>
                        <div style={{ display: manageOrder ? "block" : "none" }} className="space-y-3 max-h-[420px] w-[400px] overflow-y-auto">
                            {[1, 2, 3, 4].map((order) => (
                                <div
                                    key={order}
                                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                                >
                                    <div>
                                        <h3 className="text-sm font-semibold">#ORD-102{order}</h3>
                                        <p className="text-xs text-gray-500">Suresh Kumar</p>
                                        <p className="text-sm">Nike Air Max</p>
                                        <p className="text-sm font-medium">₹4,999</p>
                                    </div>

                                    <select className="rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-black">
                                        <option>Pending</option>
                                        <option>Completed</option>
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Seller_Dashboard