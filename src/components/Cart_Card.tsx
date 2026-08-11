
type Card_prop = {
    img: string,
    p_name: string,
    price: number,
    onclick?:()=> void | Promise<void>
    onclickinc:()=> void | Promise<void>
    onclickdec:() => void | Promise<void>
    quantity:number
}
const Cart_Card = ({ img, p_name, price,onclick,onclickinc,onclickdec,quantity }: Card_prop) => {
    
    
   
    

    return (
        <>
            <div className='w-full md:h-[100px] lg:h-[150px] p-5 flex mb-10  bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-xl justify-between'>
                <div className='md:flex-col lg:flex-row flex items-center lg:gap-10'>
                    <div className=' hidden lg:flex justify-center items-center  lg:h-[100px] shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] w-[100px] overflow-hidden rounded-md '>
                        <img src={img} className=' md:w-max lg:h-full lg:w-auto object-contain' alt="product" />
                    </div>
                    <div className=' h-full flex flex-col md:justify-center lg:justify-between'>
                        <h1 className='md:text-md lg:text-2xl font-[500]'>{p_name}</h1>
                        <div className='hidden lg:flex gap-5 p-1 bg-gray-200 w-max px-6 rounded-2xl text-xl'>
                            <button onClick={onclickdec} className='text-xl font-[600]'>-</button>
                            <h1 className='font-[600]'>{quantity}</h1>
                            <button onClick={onclickinc} className='text-xl font-[600]'>+</button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-between'>
                    <h1 className='text-md lg:text-2xl font-[600]'>₹ {price * quantity}</h1>
                    <button onClick={ onclick} className='bg-black md:text-sm p-1 lg:text-xl font-[400]  lg:px-6 lg:py-2 rounded-md text-white'>Delete</button>
                </div>
            </div>
            <div >

            </div>

        </>
    )
}

export default Cart_Card