
import { motion } from 'framer-motion'
type prop = { btntext:string }
const AuthBtn = ({btntext}:prop) => {
    return (
        <>
            <div className='w-full '>
                <motion.button type='submit' whileHover={{scale:1.05,cursor:"pointer"}} whileTap={{y:5}} transition={{duration:0.2}} className='py-2 px-1 w-full text-white font-[400] text-center bg-black rounded-md'>{btntext}</motion.button>
            </div>
        </>
    )
}

export default AuthBtn