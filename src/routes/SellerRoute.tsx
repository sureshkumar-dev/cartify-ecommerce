
import { Outlet , Navigate } from 'react-router-dom'

const sellerRoute = () => {
    const token = localStorage.getItem('sellertoken')
    if(!token){
        return <Navigate to='/auth' replace/>
    }
    return <Outlet/>;
}

export default sellerRoute