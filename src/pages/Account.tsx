import axios from "axios";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const profile =
    "https://img.icons8.com/fluency/96/user-male-circle.png";

const switchacclogo =
    "https://img.icons8.com/fluency/48/synchronize.png";

const logoutlogo =
    "https://img.icons8.com/fluency/48/logout-rounded.png";

const Account = () => {
    const navigate = useNavigate()
    interface User {
        id: number;
        username: string;
        email: string;
        number: string;
        password: string;
        role: string;
    }

    interface FetchUserResponse {
        success: boolean;
        hl: string;
        email: string;
        role: string;
        username: string;
        user: User[];
    }
    const [user, setuser] = useState<FetchUserResponse | null>()
    const switchacc = () => {
        navigate('/auth')
    }
    const logout = () => {
        localStorage.removeItem('token')
        navigate('/auth')
    }
    const fetchbuyer = async (): Promise<void> => {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:3000/fetch-user', {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        setuser(res.data)
    }
    useEffect(() => {
        fetchbuyer();
    }, [])
    return (
        <>
            <Navbar />
            <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

                <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">

                    {/* Header */}

                    <div className="bg-black h-28 flex justify-center items-end">

                        <img
                            src={profile}
                            alt="Profile"
                            className="h-28 w-28 rounded-full border-4 border-white object-cover translate-y-10"
                        />

                    </div>

                    {/* Body */}

                    <div className="pt-14 px-6 pb-6">

                        <div className="text-center">

                            <h1 className="text-2xl font-semibold">
                                {user?.username}
                            </h1>

                            <p className="text-gray-500 mt-1">
                                {user?.email}
                            </p>

                            <span className="inline-block mt-3 rounded-full bg-gray-100 px-4 py-1 text-sm font-medium">
                                {user?.user[0].role} Account
                            </span>

                        </div>

                        {/* Details */}

                        <div className="mt-8 space-y-4">

                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-gray-400">
                                    Email
                                </p>

                                <h2 className="font-medium break-all">
                                    {user?.email}
                                </h2>
                            </div>



                            <div className="rounded-xl border p-4">
                                <p className="text-sm text-gray-400">
                                    Role
                                </p>

                                <h2 className="font-medium">
                                    {user?.user[0].role}
                                </h2>
                            </div>

                        </div>

                        {/* Buttons */}

                        <div className="mt-8 flex flex-col gap-3">

                            <button onClick={switchacc} className="flex items-center justify-center gap-2 rounded-xl bg-black py-3 text-white transition hover:bg-gray-800">

                                <img
                                    src={switchacclogo}
                                    alt="Switch"
                                    className="h-6 w-6"
                                />

                                Switch Account

                            </button>

                            <button onClick={logout} className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-500 transition hover:bg-red-500 hover:text-white">

                                <img
                                    src={logoutlogo}
                                    alt="Logout"
                                    className="h-6 w-6"
                                />

                                Logout

                            </button>

                        </div>

                    </div>

                </div>

            </section>
        </>
    );
};

export default Account;