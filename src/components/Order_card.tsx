
import { useNavigate } from 'react-router-dom'
type Card_props = {
    product_id: number,
    img: string,
    p_name: string,
    order_id: string,
    quantity: number,
    total: number,
    date: string
}
type statusts =  string
type status_props = {
    status:statusts
}
const statusStyle: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  shipped: "bg-blue-100 text-blue-700",
  delivered: "bg-green-100 text-green-700",
};
const Order_card = ({ img, p_name, order_id, date, quantity, total,status,product_id }: Card_props & status_props) => {
    const navigate = useNavigate()
    return (
        <>
            <div className='w-full h-max  bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)]  rounded-md flex flex-col md:flex-row justify-between items-center p-5 '>
                <div className='h-[120px] overflow-hidden w-[120px]'>
                    <img src={img} alt="product image" className='object-cover rounded-md h-full w-full overflow-hidden ' />
                </div>
                <div className='flex pt-5 md:pt-0 flex-col gap-3 pr-10'>
                    <h1 className='font-[500] text-xl lg:text-3xl'>{p_name}</h1>
                    <div className='flex flex-col md:flex-row gap-4'><p>Order ID : {order_id}</p> <p>Date : {date}</p></div>
                </div>
                <div className=' gap-20 hidden lg:flex'>
                    <div className='flex flex-col items-center gap-3'>
                        <h1>QUANTITY</h1>
                        <h1>{quantity}</h1>
                    </div>
                    <div className='flex flex-col items-center gap-3'>
                        <h1>PRICE</h1>
                        <h1>₹ {total}</h1>
                    </div>

                </div>
                <div className='hidden lg:block' >
                    <p className={`py-[1px] px-4 rounded-xl bg-sky-100 text-sky-700  ${statusStyle[status]}`}>{status}</p>
                </div>
                <div className='lg:pr-10 hidden md:block'>
                    <button onClick={() => {navigate(`/order-details/${product_id}`)}} className='p-2 px-4 rounded-md border-1 hover:cursor-pointer border-[#155eef] text-[#155eef]'>VIEW DETAILS </button>
                </div>
            </div>
        </>
    )
}

export default Order_card