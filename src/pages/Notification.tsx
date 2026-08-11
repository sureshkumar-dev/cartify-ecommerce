
import Navbar from '../components/Navbar'

const Notification = () => {
    return (
        <>
            <Navbar />
            <div className='w-full flex'>
                <div className='mx-auto w-[90%] md:w-[60%] lg:w-[40%] flex flex-col '>
                    <div className='pt-10 pb-10'>
                        <h1 className='text-2xl md:text-4xl font-[500] pb-3'>Notifications</h1>
                        <p className='text-md md:text-xl font-[400]'>Keep track of your latest account activity and updates.</p>
                    </div>
                    <div className='w-full'>
                        <div className='w-full h-max border-1 border-gray-400 p-3 rounded-md'>
                            <h1 className='text-xl md:text-3xl font-400'>Notification Title</h1>
                            <p className='text-gray-400'>Notification Desc</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Notification