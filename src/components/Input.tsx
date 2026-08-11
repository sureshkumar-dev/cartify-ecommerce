
import  { type ChangeEvent } from 'react'
type ip_props = {
    label: string,
    placeholder: string,
    type: "text" | "password" | "email",
    onchange?:(e:ChangeEvent<HTMLInputElement>) => void,
    value?:string | number;
}
const Input = ({ label, placeholder, type ,onchange,value}: ip_props) => {
    return (
        <>
            <div className='w-full '>
                <p className='pb-2'>{label}</p>
                <input placeholder={placeholder} value={value} onChange={onchange} className='w-full  rounded-md border bg-gray-50
border-gray-200 p-1 pl-3 mb-3 py-2 outline-none focus:border-black' type={type} />
            </div>
        </>
    )
}

export default Input