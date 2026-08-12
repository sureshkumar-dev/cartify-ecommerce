import React, { useEffect, useState, type ChangeEvent } from 'react'
import search from '../assets/searchLogo.png';
import drop from '../assets/drop.png';
import Product_card from './Product_card';
import axios from 'axios';

interface Product {
    product_id: number;
    product_img: string;
    product_name: string;
    product_desc: string;
    product_price: number;
    product_stock: number;
    seller_id: number;
    created_at: string;
    updated_at: string;
    category: string;
    status: "approved" | "pending" | "rejected";
    storename: string;
}

const Products_list = () => {
    const [products, setproducts] = useState<Product[]>([])
    const [range, setrange] = useState<number | string | undefined>()
    const [sortCat, setsortCat] = useState<string>("Newest")
    const [sortby, setsortby] = useState<string>('newest')
    const [sortOpen, setsortOpen] = useState<boolean>(false)
    const [serchproduct, setsearchproduct] = useState<string>()
    const [category, setcategory] = useState<string>()
    const [filterdate, setfilterdate] = useState<string>()
    const fetchProducts = async (): Promise<void> => {
        console.log(category, filterdate, range);

        const res = await axios.get("https://cartify-backend-kzss.onrender.com/buyer/fetch-product",
            {
                params: {
                    search: serchproduct,
                    category,
                    range,
                    filterdate,
                    sortby
                }
            }
        )
        console.log(res.data);
        setproducts(res.data.products);
    }
    const clearFilters = () => {
        setcategory("");
        setfilterdate("");
        setrange(undefined);
        setsortby("newest");
        setsortCat("Newest");

        fetchProducts();
    };
    const addtoCart = async (productID:number)=>{
        console.log("Received productID:", productID);
        console.log('add to cart working');
        const token = localStorage.getItem('token')
        const res = await axios.post('https://cartify-backend-kzss.onrender.com/buyer/add-to-cart',{
            productID
        },{
            headers:{
                authorization:`Bearer ${token}`
            }
        })
        console.log(res);
        
    }
    useEffect(() => {
        fetchProducts();
    }, [serchproduct, sortby])
    return (
        <>
            <div className='w-full'>
                <div className='flex h-[640px] overflow-hidden'>
                    <aside className=' hidden lg:flex bg-white w-[290px] h-full shrink-0   flex-col  items-center pt-15' >
                        <div className='pb-6'>
                            <h1 className='text-[19px]  font-[500] pb-1'>Category</h1>
                            <ul className='flex flex-col gap-y-2'>
                                <li ><input onChange={() => { setcategory('Fashions') }} type="radio" name='category' /> Fashions</li>
                                <li><input onChange={() => { setcategory('Electronics') }} type="radio" name='category' /> Electronics</li>
                                <li><input onChange={() => { setcategory('Home & Living') }} type="radio" name='category' /> Home & Living</li>
                                <li><input onChange={() => { setcategory('Personal Care') }} type="radio" name='category' /> Personal Care</li>

                            </ul>
                        </div>
                        <div className='pb-6'>
                            <h1 className='text-[19px] font-[500] pb-1'>Added Date</h1>
                            <ul className='flex flex-col gap-y-2'>
                                <li><input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setfilterdate(e.target.value) }} type="radio" value='today' name='date' /> Today</li>
                                <li><input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setfilterdate(e.target.value) }} type="radio" value='week' name='date' /> This Week</li>
                                <li><input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setfilterdate(e.target.value) }} type="radio" value='month' name='date' /> This Month</li>
                                <li><input onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setfilterdate(e.target.value) }} type="radio" value='year' name='date' /> This Year</li>

                            </ul>
                        </div>
                        <div className='w-[150px] pb-6'>
                            <h1 className='text-[19px] font-[500]'>Price Range</h1>
                            <input type="range" className='range w-full' min={50} max={20000} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setrange(e.target.value) }} />
                            <div className='flex w-full w-35 justify-between'>
                                <h1>₹50</h1>
                                <h1>₹{range}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 w-[150px]'>
                            <button onClick={() => { fetchProducts() }} className='w-full px-2 py-1 bg-black text-white'>Filter</button>
                            <button onClick={()=> { clearFilters() }} className='w-full px-2 py-1 bg-black text-white'>Clear Filters</button>
                        </div>
                    </aside>
                    <div className='bg-white h-full flex-1 p-5   md:p-13 flex flex-col overflow-hidden'>
                        <div className='flex justify-between pt-2'>
                            <div className='flex w-[280px] md:w-[340px]  h-max border-2 rounded-md border-gray-400 gap-2 bg-white p-[5px] md:py-1'>
                                <img className='h-[25px]' src={search} alt="serach logo" />
                                <input value={serchproduct} onChange={(e: ChangeEvent<HTMLInputElement>) => { setsearchproduct(e.target.value) }} type="text" placeholder='Search Products...' className='w-full outline-none border-none focus:outline-none' />
                            </div>
                            <div className=' md:flex gap-1 items-center relative'>
                                <span className='hidden md:block'> Sort By :</span><button onClick={() => { !sortOpen ? setsortOpen(true) : setsortOpen(false) }} className='flex gap-1 items-center justify-between  pl-5 pr-2 w-30 lg:w-45 '>{sortCat}<img src={drop} alt="drop" /></button>
                                <ul onClick={() => { sortOpen ? setsortOpen(false) : setsortOpen(true) }} style={{ display: sortOpen ? "block" : "none" }} className='absolute z-20 md:border-1 top-[100%] right-0 w-30 md:w-45 bg-white text-center '>
                                    <li onClick={(e) => { setsortCat(e.currentTarget.textContent), setsortby('priceup'), fetchProducts() }} className='border-b-1 hover:cursor-pointer hover:bg-gray-200'>Price ↑</li>
                                    <li onClick={(e) => { setsortCat(e.currentTarget.textContent), setsortby('pricedown'), fetchProducts() }} className='border-b-1 hover:cursor-pointer hover:bg-gray-200'>Price ↓</li>
                                    <li onClick={(e) => { setsortCat(e.currentTarget.textContent), setsortby('newest'), fetchProducts() }} className='hover:cursor-pointer hover:bg-gray-200'>Newest</li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-8 gap-y-4 overflow-y-auto flex-1 min-h-0 mt-5 pl-2 pb-8 pt-14 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]'>
                            {products.map((item) => (
                                <div key={item.product_id}>
                                    <Product_card onclick={addtoCart} p_id={item.product_id} p_name={item.product_name} price={Number(item.product_price)} seller={item.storename} img={`https://cartify-backend-kzss.onrender.com/uploads/${item.product_img}`} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Products_list