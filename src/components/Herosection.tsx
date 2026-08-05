import React, { type JSX } from 'react'
import { animate, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const Herosection = (): JSX.Element => {
    const navigate = useNavigate();
    return (
        <>
            <section className='h-max bg-red-300'>
                <div className='w-full flex'>
                    <div className='bg-white w-full flex lg:w-1/2 lg:pt-[100px] md:pt-[60px] md:pb-[60px] justify-center pl-[20px] pt-[30px] lg:pb-[100px] lg:flex justify-center'>
                        <div>
                            <p className='text-[17px] m-0 font-[500]'>SHOP MADE EASY</p>
                            <motion.h1 initial={{ y: -10 }} whileInView={{ y: 10 }} transition={{ duration: 2 }} className='text-[35px] md:text-[55px]  font-[600] leading-[38px] md:leading-[65px]'>Your Everyday<br /> Shopping
                                Made <br /> Better And Easier.</motion.h1>
                            <p className='pt-[15px] text-gray-500'>Discover thoughtfully selected essentials designed for everyday style, comfort <br />and confidence.</p>
                            <div className='flex gap-7 pt-[20px]'>
                                <motion.button whileTap={{ scale: 1, y: 5 }} whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.2 }} className='px-4 py-1 rounded-[8px] md:px-8  md:py-3 text-[17px] font-[400] md:rounded-[15px]   hover:cursor-pointer bg-black text-white' onClick={() => { navigate('/products')}}>Explore Products</motion.button>
                                <motion.button whileTap={{ scale: 1, y: 5 }} whileHover={{ scale: 1.1, y: -5 }} transition={{ duration: 0.2 }} className=' px-4 py-1 rounded-[8px] shadow-[0_3px_10px_rgb(0,0,0,0.2)]  md:px-8 md:py-3 text-[17px] font-[400] md:rounded-[15px] bg-white text-black'>Go to Cart</motion.button>
                            </div>
                            <div className='pt-[30px] flex gap-5 text-gray-500'>
                                <h1>Free Shipping</h1> · <h1>Easy Returns</h1> · <h1>Secure Payments</h1>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white w-1/2 hidden lg:flex justify-center items-center'>
                        <div className='bg-white mt-5 h-[600px] w-[600px] relative'>
                            <motion.div   className='h-[50px] w-[50px] border-2 border-gray-400 absolute top-30 right-30 z-99'>
                                <div className='w-max p-1 border-3 border-gray-500 px-3 absolute bottom-[50%] left-[50%] z-100 bg-white  flex flex-col justify-center items-center'>
                                    <h1 className='text-[35px] font-[500] text-[#155eef]'>01</h1>
                                    <p className='font-[600]'>QUALITY</p>
                                </div>
                            </motion.div>
                            <div className='w-[50px] h-[80px] border-1 border-gray-400 absolute top-[85%] left-20 '>
                                <div className='w-[210px]  h-[160px] border-3 flex bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] flex-col justify-center border-[#155eef] absolute bottom-[50%] left-[50%]'>
                                    <div className='p-1'>
                                        <h1 className='text-[25px] pl-2 font-[600]'>SIMPLE.</h1>
                                        <h1 className='text-[25px] pl-2 font-[600] text-[#155eef]'>FAST.</h1>
                                        <h1 className='text-[25px] pl-2 font-[600]'>RELIABLE.</h1>
                                    </div>

                                </div>
                            </div>
                            <motion.div  animate={{y:[-50,50,-50] }} transition={{duration:6 , repeat:Infinity,ease:"easeInOut"}} className='h-[20px] w-[50px] border-2 border-gray-400 absolute top-90 right-[95%] z-99'>
                                <div className='w-max py-5   p-1 border-3 border-gray-500 px-3 absolute bottom-[100%] left-1/2 -translate-x-1/2 z-100 bg-white  flex flex-col justify-center items-center'>
                                    <p className='text-[35px] m-0 p-0 font-[900] text-[#155eef] absolute bottom-[75%] left-3'>.</p>
                                    <h1 className='text-[35px] font-[500] text-[#155eef]'>NEW</h1>
                                    <p className='font-[600]'>ARRIVALS</p>
                                </div>
                            </motion.div>
                            <motion.div  animate={{y:[-20,20,-20] }} transition={{duration:8 , repeat:Infinity,ease:"easeInOut"}} className='h-[35px] w-[35px]  border-2 border-dotted border-gray-400 absolute top-84 right-22 z-100'>
                                <div className='w-max p-1 border-3 border-gray-500   px-3 absolute bottom-[50%] left-[50%] z-99 bg-white  flex flex-col justify-center items-center'>
                                    <h1 className='text-[40px] font-[700] text-[#155eef] px-3'>&darr;</h1>

                                </div>
                            </motion.div>
                            <div className='absolute top-[70%] animate-spin right-10'>
                                <div className='border-2 border-dotted border-[#155eef] w-40 h-40 flex items-center justify-center rounded-[50%]'>
                                    <div className='border-2 border-gray-400 w-20 h-20 flex items-center justify-center rounded-[50%]'>
                                        <h1 className='text-[40px] text-[#155eef]'>+</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='w-[100px]  absolute bottom-[90%] right-38 h-[60px] grid grid-cols-8 grid-rows-4'>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>
                                <div className='text-[25px] text-gray-600 font-[600]'>.</div>

                            </div>
                            <div className=' w-[60px]  absolute bottom-10 right-[95%] h-[60px] grid grid-cols-3 grid-rows-3 '>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>
                                <div className='text-[30px] text-[#155eef] font-[600]'>.</div>



                            </div>
                            <div className='absolute left-1/2 top-30  -translate-x-1/2 '>
                                <h1 className='text-[75px]  font-[600] leading-[75px]'>SHOP <br /> <span className='text-[#155eef]'><span className='border-b-4'>SM</span>ARTER.</span></h1>
                            </div>
                            <div>
                                <p className=' absolute left-1/2  -translate-x-1/2 top-74 text-xl font-[500] text-gray-500'>EVERYDAY ESSENTIALS <br /> BETTER EXPERIENCES</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Herosection