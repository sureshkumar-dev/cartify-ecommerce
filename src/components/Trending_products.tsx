import axios from "axios"
import { useEffect, useState } from "react";
import Product_card from "./Product_card";

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
const [products,setproducts] = useState<Product[]>([])
const Trending_products = () => {
    const fetchTrending = async():Promise<void> => {
        const res = await axios.post('https://cartify-backend-kzss.onrender.com/buyer/trending')
        console.log(res.data);
        setproducts(res.data.products)
        
    }
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
    useEffect(()=>{
        fetchTrending();
    },[])
    return (
        <>
            <div className='pl-4 md:pl-20 md:pr-20 pt-10 pb-10'>
                <h1 className='text-[30px] pb-8  font-[600] '>Trending Now</h1>
                <div className='grid grid-cols-2 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 md:gap-10 gap-y-4'>
                   {products.map((item) => (
                                <div key={item.product_id}>
                                    <Product_card onclick={addtoCart} p_id={item.product_id} p_name={item.product_name} price={Number(item.product_price)} seller={item.storename} img={`https://cartify-backend-kzss.onrender.com/uploads/${item.product_img}`} />
                                </div>
                            ))}
                </div>
            </div>
        </>
    )
}

export default Trending_products