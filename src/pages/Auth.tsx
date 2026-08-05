import React, { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Cart from '../assets/cartimage.png'
import AuthBtn from '../components/AuthBtn'
import Input from '../components/Input'
import buy_black from '../assets/role/buyer_black.png';
import buy_white from '../assets/role/buyer_white.png';
import sell_black from '../assets/role/seller_black.png';
import sell_white from '../assets/role/seller_white.png';
import { motion } from 'framer-motion'
const Auth = () => {
    const navigate = useNavigate();
    type userdata_props = {
        username: string,
        email: string,
        number: string,
        password: string,
        confirmpwd: string,
        role: "buyer" | "seller" | null;
    }
    type storedata_props = {
        storename: string,
        email: string,
        number: string,
        password: string,
        confirmpwd: string,
        role: "buyer" | "seller" | null
    }
    type userlogin_props = {
        email: string,
        password: string,
        role: "buyer"
    }
    type sellerlogin_props = {
        email: string,
        password: string,
        role: "seller"
    }
    const [buyer, setbuyer] = useState<boolean>(true)
    const [seller, setseller] = useState<boolean>(false)
    const [admin, setadmin] = useState<boolean>(false)
    const [signin, setsignin] = useState<boolean>(true)
    const [signup, setsignup] = useState<boolean>(false)
    const [buyerRestpwd, setbuyerResetpwd] = useState<string>("")
    const [buyerotp, setbuyerotp] = useState<string>()
    const [otpsecUser, setotpsecUser] = useState<boolean>(false)
    const [otpsecSeller, setotpsecSeller] = useState<boolean>(false)
    const [sellerRestpwd, setsellerResetpwd] = useState<string>("")
    const [sellerotp, setsellerotp] = useState<string>()
    const [forgetpwd, setforgetpwd] = useState<boolean>(false)
    const [userResetSec, setUserResetSec] = useState<boolean>(false);
    const [sellerResetSec, setSellerResetSec] = useState<boolean>(false);
    const [adminid, setadminid] = useState<string>();
    const [adminpwd, setadminpwd] = useState<string>();
    const [userNewPwd, setUserNewPwd] = useState({
        password: "",
        confirmpassword: ""
    });

    const [sellerNewPwd, setSellerNewPwd] = useState({
        password: "",
        confirmpassword: ""
    });
    const [userdata, setuserdata] = useState<userdata_props>({
        username: "",
        email: "",
        number: "",
        password: "",
        confirmpwd: "",
        role: "buyer"
    })
    const [storedata, setstoredata] = useState<storedata_props>({
        storename: "",
        email: "",
        number: "",
        password: "",
        confirmpwd: "",
        role: "seller"
    })
    const [userloginData, setuserloginData] = useState<userlogin_props>({
        email: "",
        password: "",
        role: "buyer"
    })
    const [sellerloginData, setsellerloginData] = useState<sellerlogin_props>({
        email: "",
        password: "",
        role: "seller"
    })
    const handleSignupBuyer = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            if (
                userdata.email.trim() === "" ||
                userdata.number.trim() === "" ||
                userdata.password.trim() === "" ||
                userdata.confirmpwd.trim() === ""
            ) {
                alert("Please fill in all required fields.");
            } else if (userdata.number.length !== 10) {
                alert("Please enter a valid 10-digit mobile number.");
            } else if (userdata.password.length < 8) {
                alert("Password must be at least 8 characters long.");
            } else if (userdata.password !== userdata.confirmpwd) {
                alert("Passwords do not match.");
            }
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/buyer/signup', userdata)
            console.log(res.data);
            if (res.data.success) {
                alert("Account created successfully. Please sign in.");
                setsignup(false);
                setsignin(true);
                setuserloginData({
                    email: userdata.email,
                    password: "",
                    role: "buyer"
                });

                setuserdata({
                    username: "",
                    email: "",
                    number: "",
                    password: "",
                    confirmpwd: "",
                    role: "buyer"
                });
            }
            console.log(userdata);
        } catch (err) {
            console.log(err);

        }


    }
    const handleSignupSeller = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            if (
                storedata.email.trim() === "" ||
                storedata.number.trim() === "" ||
                storedata.password.trim() === "" ||
                storedata.confirmpwd.trim() === ""
            ) {
                alert("Please fill in all required fields.");
            } else if (storedata.number.length !== 10) {
                alert("Please enter a valid 10-digit mobile number.");
            } else if (storedata.password.length < 8) {
                alert("Password must be at least 8 characters long.");
            } else if (storedata.password !== storedata.confirmpwd) {
                alert("Passwords do not match.");
            }
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/seller/signup', storedata)
            console.log(res.data);
            if (res.data.success) {
                alert("Account created successfully. Please sign in.");
                setsignup(false);
                setsignin(true);

                setsellerloginData({
                    email: storedata.email,
                    password: "",
                    role: "seller"
                });

                setstoredata({
                    storename: "",
                    email: "",
                    number: "",
                    password: "",
                    confirmpwd: "",
                    role: "seller"
                });

            }

        } catch (err) {
            console.log(err);

        }


    }


    const handleUserLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            if (
                userloginData.email.trim() === "" ||
                userloginData.password.trim() === ""
            ) {
                return alert("Please fill in all required fields.");

            } else if (userloginData.password.length < 8) {
                return alert("Password must be at least 8 characters long.");
            }
            e.preventDefault();
            const res = await axios.post('http://localhost:3000/buyer/login', userloginData)
            if (res.data.success) {
                navigate('/home')
            }
            localStorage.removeItem("sellertoken");
            localStorage.removeItem("admintoken");
            localStorage.setItem("token", res.data.token);
            console.log(res.data);

        } catch (err) {
            console.log(err);

        }
    }
    const handleGenerateotpUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            console.log('gen otp user');

            if (buyerRestpwd.trim() == "") {
                alert("please fill all fields")
                e.preventDefault()
                return;

            }
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/buyer/forget-password', {
                email: buyerRestpwd
            })
            const otp = res.data.otp;
            console.log('otp :', otp);


            setotpsecUser(true)
        } catch (err: any) {
            alert(err.response.data.message)
        }

    }
    const handleGenerateotpSeller = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            console.log('gen otp seller');

            if (sellerRestpwd.trim() == "") {
                alert("please fill all fields")
                e.preventDefault()
                return;

            }
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/seller/forget-password', {
                email: sellerRestpwd
            })
            const otp = res.data.otp;
            console.log('otp :', otp);


            setotpsecSeller(true)
        } catch (err: any) {
            alert(err.response.data.message)
        }
    }
    const verifyOtpUser = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            console.log('ver otp user');

            if (buyerotp?.trim() == "") {
                alert("Enter Your Otp")
                e.preventDefault()
                return;
            }
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/buyer/forget-password/verify-otp', {
                email: buyerRestpwd,
                OTP: buyerotp
            })
            console.log(res.data);
            if (res.data.success) {
                setUserResetSec(true);
            }

        } catch (err: any) {
            alert(err.response.data.message);

        }

    }
    const verifyOtpSeller = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            console.log('ver otp user');

            if (sellerotp?.trim() == "") {
                alert("Enter Your Otp")
                e.preventDefault()
                return;
            }
            e.preventDefault()
            const res = await axios.post('http://localhost:3000/seller/forget-password/verify-otp', {
                email: sellerRestpwd,
                OTP: sellerotp
            })
            console.log(res.data);
            if (res.data.success) {
                setSellerResetSec(true);
            }

        } catch (err: any) {
            alert(err.response.data.message)
            console.log(err);

        }

    }
    const handleSellerLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        try {
            if (
                sellerloginData.email.trim() === "" ||
                sellerloginData.password.trim() === ""
            ) {
                alert("Please fill in all required fields.");
            } else if (sellerloginData.password.length < 8) {
                alert("Password must be at least 8 characters long.");

            }
            e.preventDefault();
            const res = await axios.post('http://localhost:3000/seller/login', sellerloginData)
            if (res.data.success) {
                navigate('/seller')
            }
            localStorage.removeItem("token");
            localStorage.removeItem("admintoken");
            localStorage.setItem("sellertoken", res.data.token);

        } catch (err) {
            console.log(err);
        }
    }
    const handleResetPasswordUser = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        try {
            e.preventDefault();

            if (
                userNewPwd.password.trim() === "" ||
                userNewPwd.confirmpassword.trim() === ""
            ) {
                return alert("Fill all fields");
            }

            if (userNewPwd.password !== userNewPwd.confirmpassword) {
                return alert("Passwords do not match");
            }

            await axios.post(
                "http://localhost:3000/buyer/update-password",
                {
                    email: buyerRestpwd,
                    password: userNewPwd.password
                }
            );

            alert("Password updated successfully");

            setforgetpwd(false);
            setUserResetSec(false);
            setotpsecUser(false);

            setUserNewPwd({
                password: "",
                confirmpassword: ""
            });

            setsignup(false);
            setsignin(true);

        } catch (err: any) {
            alert(err.response.data.message);
        }
    };
    const handleResetPasswordSeller = async (
        e: React.FormEvent<HTMLFormElement>
    ): Promise<void> => {
        try {
            e.preventDefault();

            if (
                sellerNewPwd.password.trim() === "" ||
                sellerNewPwd.confirmpassword.trim() === ""
            ) {
                return alert("Fill all fields");
            }

            if (
                sellerNewPwd.password !==
                sellerNewPwd.confirmpassword
            ) {
                return alert("Passwords do not match");
            }

            await axios.post(
                "http://localhost:3000/seller/update-password",
                {
                    email: sellerRestpwd,
                    password: sellerNewPwd.password
                }
            );

            alert("Password updated successfully");

            setforgetpwd(false);
            setSellerResetSec(false);
            setotpsecSeller(false);

            setSellerNewPwd({
                password: "",
                confirmpassword: ""
            });

            setsignup(false);
            setsignin(true);

        } catch (err: any) {
            alert(err.response.data.message);
        }
    };
    const adminLogin = async (e:React.FormEvent<HTMLFormElement>): Promise<void> => {
        if (!adminid || !adminpwd) {
            return alert('please fill the all fields')
        }
        e.preventDefault();
        const res = await axios.post('http://localhost:3000/admin/login', {
            adminid: adminid,
            adminpwd: adminpwd
        })
        localStorage.removeItem("token");
        localStorage.removeItem("sellertoken");

        localStorage.setItem("admintoken", res.data.token);

        navigate("/admin-dashboard");
    }
    return (

        <>
            <div className='w-full h-full p-5 flex '>
                <div className='hidden md:hidden lg:block   lg:w-1/2  bg-white'>
                    <h1 className='text-4xl font-[600] p-2'>Cartify</h1>
                    <div>
                        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className='mt-5 '>
                            <img src={Cart} alt="cart image" />
                        </motion.div>
                        <div className='w-full flex flex-col gap-2 items-center'>
                            <h1 className='text-4xl font-[500]'>Commerce, elevated.</h1>
                            <p className='text-xl font-[400]'>Redefining the premium marketplace experience.</p>
                        </div>
                    </div>

                </div>
                <div className='md:w-full   lg:w-1/2 flex justify-center items-center  bg-white '>
                    <div className='w-[350px] md:w-[400px] bg-white rounded-xl p-5 flex justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)]  h-max'>
                        <div style={{ display: admin ? "block" : "none" }} className='admin panel'>
                            <form className='admin' onSubmit={adminLogin}>
                                <div className='w-full text-center pb-4'>
                                    <h1 className='text-3xl font-[500]'>Admin Portal</h1>
                                </div>
                                <Input value={adminid} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setadminid(e.target.value) }} placeholder='Enter your Admin Id ' type='text' label='Admin Id' />
                                <div >
                                    <Input value={adminpwd} onchange={(e: React.ChangeEvent<HTMLInputElement>) => { setadminpwd(e.target.value) }} placeholder='Enter your Password ' type='password' label='Password' />


                                </div>
                                <div  className='py-5'>
                                    <AuthBtn btntext="Sign In" />
                                </div>
                                <p onClick={() => { admin ? setadmin(false) : setadmin(true) }}>User Portal? Click Here</p>
                            </form>
                        </div>
                        <div style={{ display: admin ? "none" : "block" }} className='w-full'>


                            <h1 className='text-3xl font-[500]'>{signin ? "Welcome Back" : "Join Cartify"}</h1>
                            <p className='font-[400] pb-2 text-gray-400'>{signin ? "Sign in to continue with Cartify." : "Create your account to start with Cartify."}</p>
                            <div className='w-full  '>
                                <p className='pb-2 font-[400] '>Select Role</p>
                                <div className='flex gap-2 h-max mb-3 border-1  w-full rounded-xl bg-white '>
                                    <div onClick={() => { buyer ? (setbuyer(false), setseller(true)) : (setbuyer(true), setseller(false)) }} style={{ color: buyer ? "white" : "black", backgroundColor: buyer ? "black" : "white" }} className='w-1/2 p-1 pt-2 pb-2 pl-4 bg-blue-200 rounded-xl'>
                                        <img src={buyer ? buy_white : buy_black} alt="buy" />
                                        <h1 className='font-[500]'>Buyer</h1>
                                        <p className='text-[12px] font-[500]'>Buy Your Favorites</p>
                                    </div>
                                    <div onClick={() => { seller ? (setseller(false), setbuyer(true)) : (setseller(true), setbuyer(false)) }} style={{ color: seller ? "white" : "black", backgroundColor: seller ? "black" : "white" }} className='w-1/2 pt-2 pb-2 p-1 pl-4   rounded-xl '>
                                        <img src={seller ? sell_white : sell_black} alt="sell" />
                                        <h1 className='font-[500] '>Seller</h1>
                                        <p className='text-[12px] font-[500]'>Manage Your Store</p>
                                    </div>

                                </div>
                                <div className='w-full h-max'>
                                    <div style={{ display: buyer ? "block" : "none" }} className='buyer'>
                                        <div style={{ display: signin ? "block" : "none" }}>


                                            <form style={{ display: forgetpwd ? "none" : "block" }} onSubmit={handleUserLogin} className='buyer_login'>


                                                <Input value={userloginData.email} onchange={(e: ChangeEvent<HTMLInputElement>) => { setuserloginData({ ...userloginData, email: e.target.value }) }} placeholder='Enter your Email ' type='email' label='Email' />
                                                <div >
                                                    <Input value={userloginData.password} onchange={(e: ChangeEvent<HTMLInputElement>) => { setuserloginData({ ...userloginData, password: e.target.value }) }} placeholder='Enter your Password ' type='password' label='Password' />
                                                    <div onClick={() => { setforgetpwd(true) }} className='w-full hover:cursor-pointer'>
                                                        <p className='float-right pb-3'>Forget Password ?</p>
                                                    </div>

                                                </div>
                                                <div className='py-5'>
                                                    <AuthBtn btntext="Sign In" />
                                                </div>

                                                <div className='w-full gap-2 flex flex-col items-center'>
                                                    <p>Don't have an account? <span onClick={() => { (setsignin(false), setsignup(true)) }}>Create Account</span></p>
                                                    <p onClick={() => { !admin ? setadmin(true) : setadmin(false) }}> Access to Admin Panel</p>
                                                </div>
                                            </form>
                                            <form style={{ display: forgetpwd && !userResetSec ? "block" : "none" }} onSubmit={otpsecUser ? verifyOtpUser : handleGenerateotpUser} className='buyer_resetpwd'>
                                                <Input value={buyerRestpwd} onchange={(e: ChangeEvent<HTMLInputElement>) => { setbuyerResetpwd(e.target.value) }} placeholder='Enter your Email ' type='email' label='Email' />
                                                <div style={{ display: otpsecUser ? "block" : "none" }}>
                                                    <Input value={buyerotp} onchange={(e: ChangeEvent<HTMLInputElement>) => { setbuyerotp(e.target.value) }} placeholder='Enter your OTP ' type='text' label='OTP' />
                                                </div>
                                                <div style={{ display: otpsecUser ? "none" : "block" }} className='py-5'>
                                                    <AuthBtn btntext="Generate OTP" />
                                                </div>
                                                <div style={{ display: otpsecUser ? "block" : "none" }} className='py-5'>
                                                    <AuthBtn btntext="Verify OTP" />
                                                </div>

                                            </form>
                                            <div style={{ display: userResetSec ? "block" : "none" }}>
                                                <form onSubmit={handleResetPasswordUser}>
                                                    <Input
                                                        value={userNewPwd.password}
                                                        onchange={(e) =>
                                                            setUserNewPwd({
                                                                ...userNewPwd,
                                                                password: e.target.value,
                                                            })
                                                        }
                                                        label="New Password"
                                                        type="password"
                                                        placeholder="Enter New Password"
                                                    />

                                                    <Input
                                                        value={userNewPwd.confirmpassword}
                                                        onchange={(e) =>
                                                            setUserNewPwd({
                                                                ...userNewPwd,
                                                                confirmpassword: e.target.value,
                                                            })
                                                        }
                                                        label="Confirm Password"
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                    />

                                                    <div className="py-5">
                                                        <AuthBtn btntext="Reset Password" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div style={{ display: signup ? "block" : "none" }}>


                                            <form className='buyer_create' onSubmit={handleSignupBuyer}>
                                                <Input value={userdata.username} onchange={(e) => { setuserdata({ ...userdata, username: e.target.value }) }} label='Full Name' type='text' placeholder='Enter Your Name' />
                                                <Input value={userdata.email} onchange={(e) => { setuserdata({ ...userdata, email: e.target.value }) }} label='Email' type='email' placeholder='Enter Your Email' />
                                                <Input value={userdata.number} onchange={(e) => { setuserdata({ ...userdata, number: e.target.value }) }} label='Mobile Number' type='text' placeholder='Enter Your Number' />
                                                <Input value={userdata.password} onchange={(e) => { setuserdata({ ...userdata, password: e.target.value }) }} label='Password' type='password' placeholder='Enter Your Password' />
                                                <Input value={userdata.confirmpwd} onchange={(e: ChangeEvent<HTMLInputElement>) => { setuserdata({ ...userdata, confirmpwd: e.target.value }) }} label='Confirm Password' type='password' placeholder='Confirm Password' />
                                                <div className='pt-3 pb-3'>
                                                    <AuthBtn btntext='Sign Up' />
                                                </div>
                                                <div className='w-full gap-2 flex flex-col items-center'>
                                                    <p>Already have an account?<span onClick={() => { (setsignin(true), setsignup(false)) }}> Sign In</span></p>
                                                    <p onClick={() => { !admin ? setadmin(true) : setadmin(false) }} >Access to Admin Panel</p>
                                                </div>

                                            </form>
                                        </div>
                                    </div>
                                    <div style={{ display: seller ? "block" : "none" }} className='seller'>
                                        <div style={{ display: signin ? "block" : "none" }}>


                                            <form style={{ display: forgetpwd ? "none" : "block" }} onSubmit={handleSellerLogin} className='seller_login' >


                                                <Input value={sellerloginData.email} onchange={(e: ChangeEvent<HTMLInputElement>) => { setsellerloginData({ ...sellerloginData, email: e.target.value }) }} placeholder='Enter your Email ' type='email' label='Email' />
                                                <div >
                                                    <Input value={sellerloginData.password} onchange={(e: ChangeEvent<HTMLInputElement>) => { setsellerloginData({ ...sellerloginData, password: e.target.value }) }} placeholder='Enter your Password ' type='password' label='Password' />
                                                    <div onClick={() => { setforgetpwd(true) }} className='w-full hover:cursor-pointer'>
                                                        <p className='float-right pb-3'>Forget Password ?</p>
                                                    </div>

                                                </div>
                                                <div className='py-5'>
                                                    <AuthBtn btntext="Sign In" />
                                                </div>

                                                <div className='w-full gap-2 flex flex-col items-center'>
                                                    <p>Don't have an account?<span onClick={() => { (setsignin(false), setsignup(true)) }} className='font-[500]'> Create Account</span></p>
                                                    <p onClick={() => { !admin ? setadmin(true) : setadmin(false) }}>Access to Admin Panel</p>
                                                </div>
                                            </form>
                                            <form style={{ display: forgetpwd && !sellerResetSec ? "block" : "none" }} onSubmit={otpsecSeller ? verifyOtpSeller : handleGenerateotpSeller} className='seller_resetpwd'>
                                                <Input value={sellerRestpwd} onchange={(e: ChangeEvent<HTMLInputElement>) => { setsellerResetpwd(e.target.value) }} placeholder='Enter your Email ' type='email' label='Email' />
                                                <div style={{ display: otpsecSeller ? "block" : "none" }}>
                                                    <Input value={sellerotp} onchange={(e: ChangeEvent<HTMLInputElement>) => { setsellerotp(e.target.value) }} placeholder='Enter your OTP ' type='text' label='OTP' />
                                                </div>
                                                <div style={{ display: otpsecSeller ? "none" : "block" }} className='py-5'>
                                                    <AuthBtn btntext="Generate OTP" />
                                                </div>
                                                <div style={{ display: otpsecSeller ? "block" : "none" }} className='py-5'>
                                                    <AuthBtn btntext="Verify OTP" />
                                                </div>
                                            </form>
                                            <div style={{ display: sellerResetSec ? "block" : "none" }}>
                                                <form onSubmit={handleResetPasswordSeller}>


                                                    <Input
                                                        value={sellerNewPwd.password}
                                                        onchange={(e) =>
                                                            setSellerNewPwd({
                                                                ...sellerNewPwd,
                                                                password: e.target.value,
                                                            })
                                                        }
                                                        label="New Password"
                                                        type="password"
                                                        placeholder="Enter New Password"
                                                    />

                                                    <Input
                                                        value={sellerNewPwd.confirmpassword}
                                                        onchange={(e) =>
                                                            setSellerNewPwd({
                                                                ...sellerNewPwd,
                                                                confirmpassword: e.target.value,
                                                            })
                                                        }
                                                        label="Confirm Password"
                                                        type="password"
                                                        placeholder="Confirm Password"
                                                    />

                                                    <div className="py-5">
                                                        <AuthBtn btntext="Reset Password" />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                        <div style={{ display: signup ? "block" : "none" }}>


                                            <form onSubmit={handleSignupSeller} className='seller_create'>
                                                <Input value={storedata.storename} onchange={(e: ChangeEvent<HTMLInputElement>) => { setstoredata({ ...storedata, storename: e.target.value }) }} label='Store Name' type='text' placeholder='Enter Your Store Name' />
                                                <Input value={storedata.email} onchange={(e: ChangeEvent<HTMLInputElement>) => { setstoredata({ ...storedata, email: e.target.value }) }} label='Email' type='email' placeholder='Enter Your Email' />
                                                <Input value={storedata.number} onchange={(e: ChangeEvent<HTMLInputElement>) => { setstoredata({ ...storedata, number: e.target.value }) }} label='Mobile Number' type='text' placeholder='Enter Your Number' />
                                                <Input value={storedata.password} onchange={(e: ChangeEvent<HTMLInputElement>) => { setstoredata({ ...storedata, password: e.target.value }) }} label='Password' type='password' placeholder='Enter Your Password' />
                                                <Input value={storedata.confirmpwd} onchange={(e: ChangeEvent<HTMLInputElement>) => { setstoredata({ ...storedata, confirmpwd: e.target.value }) }} label='Confirm Password' type='password' placeholder='Confirm Password' />
                                                <div className='pt-3 pb-3'>
                                                    <AuthBtn btntext='Sign Up' />
                                                </div>
                                                <div className='w-full gap-2 flex flex-col items-center'>
                                                    <p >Already have an account? <span onClick={() => { (setsignin(true), setsignup(false)) }}> Sign In</span></p>
                                                    <p onClick={() => { !admin ? setadmin(true) : setadmin(false) }}>Access Admin Panel</p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>

                </div>
            </div>
        </>
    )
}
export default Auth