import React from 'react'
import { type JSX } from 'react';
import { motion } from 'framer-motion'
import Products from '../pages/Products';
type card_props = {
    img: string,
    p_name: string,
    price: number,
    seller: string,
    p_id:number,
    onclick:(productID:number) => void | Promise<void>
}
const Product_card = ({ img, p_name,  price, seller ,onclick ,p_id}: card_props): JSX.Element => {
    return (
        <>
            <motion.div whileHover={{ scale: 1.02 }} className='w-[160px] h-[200px] md:w-[250px] md:h-[370px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white rounded-xl relative overflow-hidden '>
                <div className='bg-white h-[65%] p-4 flex justify-center items-center'>
                    <img
                        className='w-full h-full object-cover'
                        src={img}
                        alt={p_name}
                    />
                </div>
                <h1 className='font-[600] text-[15px] md:text-[23px] pl-[10px]'>{p_name}</h1>

                <p className='text-[12px] md:text-[15px] font-[400] pl-[10px] text-[#155eef]'>{seller}</p>
                <p className='text-black absolute left-[10px] text-[15px] md:text-xl font-[600] bottom-[10px] '>₹ {price}</p>
                <motion.button onClick={() => {onclick(p_id)}} whileHover={{ cursor: "pointer" }} whileTap={{ y: 4 }} className='py-1 px-2 rounded-[10px] text-[10px] md:text-[17px]  bg-black absolute right-[10px] bottom-[10px] text-white font-[400]'>Add to Cart</motion.button>
            </motion.div>
        </>
    )
}

export default Product_card