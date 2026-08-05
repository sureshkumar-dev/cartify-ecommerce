import React, { type JSX } from 'react'
import { motion } from 'framer-motion'
const Footer = ():JSX.Element => {
    const text = "Smarter Shopping, Made Simple."
    return (
        <>
            <footer className='bg-[#F4F7FA] border-2 border-[#D9DBDD]'>
                <div className='flex flex-col items-center w-full pl-10 pr-10 md:pl-20 md:pr-20'>
                    <h1 className='text-[40px] md:font-[600] md:text-[60px] pb-1 pt-4'>Cartify</h1>
                    <motion.h1
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                            visible: {
                                transition: {
                                    staggerChildren: 0.06,
                                },
                            },
                        }}
                        className="text-[15px] font-[300] md:text-4xl md:font-[400]"
                    >
                        {text.split("").map((char, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: { opacity: 1 },
                                }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                    <p className='hidden md:block pt-5'>Discover Products You Love And Enjoy a Fast, Simple </p>
                    <p className='pb-5'> Shopping Experience - All In One </p>
                    <div className='flex  items-center gap-3 text-gray-400 pb-10'>
                        <p>Simple</p>
                        <p>|</p>
                        <p>Secure</p>
                        <p>|</p>
                        <p>Seamless</p>
                    </div>
                    
                </div>
                <div className='w-full border-t-2 py-4 flex justify-center '>
                        <p>@2026 Cartify, All rights reserved</p>
                    </div>
            </footer>
        </>
    )
}

export default Footer