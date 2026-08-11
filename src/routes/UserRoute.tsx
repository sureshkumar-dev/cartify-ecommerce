
import { Outlet , Navigate } from 'react-router-dom'

const userRoute = () => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/auth' replace/>
    }
    return <Outlet/>;
}

export default userRoute