import { Navigate } from "react-router-dom";

const RootRedirect = () => {
    const userToken = localStorage.getItem("token");
    const sellerToken = localStorage.getItem("sellertoken");
    const adminToken = localStorage.getItem('admintoken')

    if (sellerToken) {
        return <Navigate to="/seller" replace />;
    }

    if (userToken) {
        return <Navigate to="/home" replace />;
    }

    if(adminToken) {
        return <Navigate to='/admin' replace />
    }

    return <Navigate to="/auth" replace />;
};

export default RootRedirect;