import React, { useState } from 'react'
import search from '../assets/searchLogo.png';
import drop from '../assets/drop.png';
import Product_card from './Product_card';
const Products_list = () => {
    const [range, setrange] = useState<number | string>(1000)
    const [sortCat, setsortCat] = useState<string>("Newest")
    const [sortOpen, setsortOpen] = useState<boolean>(false)
    return (
        <>
            <div className='w-full'>
                <div className='flex h-[640px] overflow-hidden'>
                    <aside className=' hidden lg:flex bg-white w-[290px] h-full shrink-0   flex-col  items-center pt-15' >
                        <div className='pb-6'>
                            <h1 className='text-[19px]  font-[500] pb-1'>Category</h1>
                            <ul className='flex flex-col gap-y-2'>
                                <li><input type="checkbox" /> Fashions</li>
                                <li><input type="checkbox" /> Electronics</li>
                                <li><input type="checkbox" /> Home & Living</li>
                                <li><input type="checkbox" /> Personal Care</li>

                            </ul>
                        </div>
                        <div className='pb-6'>
                            <h1 className='text-[19px] font-[500] pb-1'>Added Date</h1>
                            <ul className='flex flex-col gap-y-2'>
                                <li><input type="checkbox" /> Today</li>
                                <li><input type="checkbox" /> This Week</li>
                                <li><input type="checkbox" /> This Month</li>
                                <li><input type="checkbox" /> This Year</li>

                            </ul>
                        </div>
                        <div className='w-[150px] pb-6'>
                            <h1 className='text-[19px] font-[500]'>Price Range</h1>
                            <input type="range" className='range w-full' min={50} max={2000} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setrange(e.target.value) }} />
                            <div className='flex w-full w-35 justify-between'>
                                <h1>₹50</h1>
                                <h1>₹{range}</h1>
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 w-[150px]'>
                            <button className='w-full px-2 py-1 bg-black text-white'>Filter</button>
                            <button className='w-full px-2 py-1 bg-black text-white'>Clear Filters</button>
                        </div>
                    </aside>
                    <div className='bg-white h-full flex-1 p-5   md:p-13 flex flex-col overflow-hidden'>
                        <div className='flex justify-between pt-2'>
                            <div className='flex w-[280px] md:w-[340px]  h-max border-2 rounded-md border-gray-400 gap-2 bg-white p-[5px] md:py-1'>
                                <img className='h-[25px]' src={search} alt="serach logo" />
                                <input type="text" placeholder='Search Products...' className='w-full outline-none border-none focus:outline-none' />
                            </div>
                            <div className=' md:flex gap-1 items-center relative'>
                               <span className='hidden md:block'> Sort By :</span><button onClick={() => { !sortOpen ? setsortOpen(true) : setsortOpen(false) }} className='flex gap-1 items-center justify-between  pl-5 pr-2 w-30 lg:w-45 '>{sortCat}<img src={drop} alt="drop" /></button>
                                <ul onClick={() => { sortOpen ? setsortOpen(false) : setsortOpen(true) }} style={{ display: sortOpen ? "block" : "none" }} className='absolute md:border-1 top-[100%] right-0 w-30 md:w-45 bg-white text-center '>
                                    <li onClick={(e) => { setsortCat(e.currentTarget.textContent) }} className='border-b-1 hover:cursor-pointer hover:bg-gray-200'>Price ↑</li>
                                    <li onClick={(e) => { setsortCat(e.currentTarget.textContent) }} className='border-b-1 hover:cursor-pointer hover:bg-gray-200'>Price ↓</li>
                                    <li onClick={(e) => { setsortCat(e.currentTarget.textContent) }} className='hover:cursor-pointer hover:bg-gray-200'>Newest</li>
                                </ul>
                            </div>
                        </div>
                        <div className='grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-8 gap-y-4 overflow-y-auto flex-1 min-h-0 mt-5 pl-2 pb-8 pt-14 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]'>
                            <Product_card
                                p_name="Wireless Headphones"
                                price={2499}
                                img="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
                                seller="Tech Store"
                            />

                            <Product_card
                                p_name="Smart Watch"
                                price={3999}
                                img="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
                                seller="Gadget Hub"
                            />

                            <Product_card
                                p_name="Running Shoes"
                                price={1899}
                                img="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
                                seller="Urban Steps"
                            />

                            <Product_card
                                p_name="Classic Sunglasses"
                                price={999}
                                img="https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
                                seller="Style Hub"
                            />

                            <Product_card
                                p_name="Leather Backpack"
                                price={2199}
                                img="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
                                seller="Bag World"
                            />

                            <Product_card
                                p_name="Digital Camera"
                                price={15999}
                                img="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
                                seller="Camera Zone"
                            />

                            <Product_card
                                p_name="Casual Sneakers"
                                price={2799}
                                img="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500"
                                seller="Sneaker Hub"
                            />

                            <Product_card
                                p_name="Analog Watch"
                                price={3499}
                                img="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=500"
                                seller="Time Store"
                            />

                            <Product_card
                                p_name="Laptop"
                                price={54999}
                                img="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500"
                                seller="Digital World"
                            />

                            <Product_card
                                p_name="Perfume"
                                price={1499}
                                img="https://images.unsplash.com/photo-1541643600914-78b084683601?w=500"
                                seller="Beauty Store"
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Products_list