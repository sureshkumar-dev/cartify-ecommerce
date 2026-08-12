import  { useEffect, useState, type JSX } from 'react'
import { motion } from 'framer-motion'
import smacc from '../assets/sidebar/account.png';
import smhome from '../assets/sidebar/home.png';
import smproducts from '../assets/sidebar/products.png';
import smorders from '../assets/sidebar/orders.png';
import smcart from '../assets/sidebar/cart.png';
import smclose from '../assets/sidebar/close.png';
import smaccount from '../assets/sidebar/accountLogo.png';
import smnotification from '../assets/sidebar/notification.png'
import { NavLink } from 'react-router-dom';
import cartlogo from '../assets/cartLogo.png';
import acclogo from '../assets/account.png';
import notificationlogo from '../assets/notificationLogo.png';
import menubar from '../assets/menuLogo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Navbar = (): JSX.Element => {
    type cartProps = {

        product_id
        :
        number,
        product_img
        :
        string,
        product_name
        :
        string,
        product_price
        :
        number,
        storename
        :
        string,
        user_id
        :
        number,
        quantity:
        number
    }
    const [cart, setcart] = useState<cartProps[]>([]);
    const [isopen, setisopen] = useState<boolean>(false)
    const navigate = useNavigate()
    const fetchCart = async () => {
        try {

            const token = localStorage.getItem('token')
            const res = await axios.get('https://cartify-backend-kzss.onrender.com/buyer/fetch-cart', {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setcart(res.data.products);





        } catch (err) {

        }
    }
    useEffect(()=>{
        fetchCart();
         
    },[cart])
    return (
        <>
            <div className='max-w-[1600px] w-full mx-auto flex items-center  '>
                <nav className='w-full h-[60px]  bg-white relative shadow-[0_10px_15px_-8px_rgba(0,0,0,0.25)] flex items-center '>
                    <div className='flex items-center w-[1450px] mx-auto   justify-between'>
                        <h1 className='pl-[30px]  font-[600] text-[30px]'>Cartify</h1>
                        <ul className=' gap-[30px] text-gray-500 hidden lg:flex font-[500]'>
                            <NavLink className={({ isActive }) => isActive ? "text-black font-[600] border-b-2" : "hover:text-black hover:font-[600] hover:border-b-2"} to={'/home'}>Home</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "text-black font-[600] border-b-2" : "hover:text-black hover:font-[600] hover:border-b-2"} to={'/products'}>Products</NavLink>
                            <NavLink className={({ isActive }) => isActive ? "text-black font-[600] border-b-2" : "hover:text-black hover:font-[600] hover:border-b-2"} to={'/my-orders'}>My Orders</NavLink>
                        </ul>
                        <div className=' hidden lg:flex h-[30px] pr-[30px] gap-5'>
                            <div className='h-[30px] w-[30px] relative'>
                                <img onClick={() => { navigate('/my-cart') }} className='h-[30px] hover:cursor-pointer' src={cartlogo} alt="cartlogo" />
                                <div className='h-[15px] w-[15px] flex justify-center items-center font-[500] absolute text-white text-[10px] bg-[#155eef] rounded-[50%] bottom-[75%] left-[60%]'>
                                    <h1 >{cart.length}</h1>

                                </div>
                            </div>
                            <div onClick={() => { navigate('/account') }} className='h-[30px] w-[30px] relative'>
                                <img className='h-[30px] hover:cursor-pointer' src={acclogo} alt="account" />
                            </div>
                            <div className='h-[30px] w-[30px] relative'>
                                <img onClick={() => { navigate('/notifications') }} className='h-[30px] hover:cursor-pointer' src={notificationlogo} alt="notification" />
                                <div className='h-[15px] w-[15px] flex justify-center items-center font-[300] absolute text-white text-[10px] bg-[#155eef] rounded-[50%] bottom-[65%] left-[60%]'>
                                    <h1 >0</h1>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => { !isopen ? setisopen(true) : setisopen(false) }} className='lg:hidden pr-[30px]'>
                            <img src={menubar} alt="menu-logo" />
                        </div>
                        <div style={{ display: isopen ? "block" : "none" }} className='lg:hidden h-[200vh] w-full absolute z-10 bg-white-300 bg-clip-padding backdrop-filter backdrop-blur-[3px] bg-opacity-5'>

                        </div>
                        <motion.div transition={{ duration: 5 }} style={{ display: isopen ? "flex" : "none" }} className='sidebar flex flex-col absolute z-20 top-0 right-0 w-[60%] md:w-1/2 bg-white h-max lg:hidden'>

                            <img onClick={() => { isopen ? setisopen(false) : setisopen(true) }} className=' h-[50px] w-[50px] ml-[75%] md:ml-[85%] p-2' src={smclose} alt="close" />
                            <div className='bg-white w-full '>
                                <div className='flex items-center ml-2 gap-2 md:mt-5 '>
                                    <img className=' h-[35px] md:h-[50px]' src={smacc} alt="account logo" />
                                    <h1 className='text-[20px] font-[400] md:text-[35px]  md:font-[500]'>Welcome User</h1>
                                </div>
                                <ul className='ml-3 mt-5 md:mt-8 flex flex-col items-start pb-20 gap-4 md:gap-6'>
                                    <li onClick={()=>{navigate('/home')}} className='flex gap-1 items-center font-[500] md:text-xl md:font-[600]'><img className='h-[25px] md:h-[30px]' src={smhome} alt="home" /> Home</li>
                                    <li onClick={()=>{navigate('/products')}} className='flex gap-1 items-center font-[500] md:text-xl md:font-[600]'><img className='h-[25px] md:h-[30px]' src={smproducts} alt="products" />Products</li>
                                    <li onClick={()=>{navigate('/my-cart')}} className='flex gap-1 items-center font-[500] md:text-xl md:font-[600]'><img className='h-[25px] md:h-[30px]' src={smcart} alt="cart" /> Mycart</li>
                                    <li onClick={()=>{navigate('/my-orders')}} className='flex gap-1 items-center font-[500] md:text-xl md:font-[600]'><img className='h-[25px] md:h-[30px]' src={smorders} alt="orders" /> My Orders</li>
                                    <li onClick={()=>{navigate('/account')}} className='flex gap-1 items-center font-[500] md:text-xl md:font-[600]'><img className='h-[25px] md:h-[30px]' src={smaccount} alt="account" /> Account</li>
                                    <li onClick={()=>{navigate('/notifications')}} className='flex gap-1 items-center font-[500] md:text-xl md:font-[600]'><img className='h-[25px] md:h-[30px]' src={smnotification} alt="notification" /> Notifications</li>

                                </ul>
                                <p className='text-center pb-5 md:font-[600] md:text-[20px]' >Terms & Conditions</p>
                            </div>



                        </motion.div>
                    </div>

                </nav>
            </div>


        </>
    )
}

export default Navbar