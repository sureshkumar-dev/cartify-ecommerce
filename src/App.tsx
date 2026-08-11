
import {  Routes, Route } from 'react-router-dom';
import Account from './pages/Account';
import Home from './pages/Home';
import Products from './pages/Products';
import MyOrders from './pages/MyOrders';
import MyCart from './pages/MyCart';
import Notification from './pages/Notification';
import Auth from './pages/Auth';
import OrderDetails from './pages/OrderDetails';
import Seller_Dashboard from './pages/Seller_Dashboard';
import Admin_Dashboard from './pages/Admin_Dashboard';
import UserRoute from './routes/UserRoute';
import SellerRoute from './routes/SellerRoute';
import RootRedirect from './components/RootRedirect';
import Checkout from './pages/Checkout';
const App = () => {
  
  
  

  return (
    <>

      <Routes>
        <Route element={<UserRoute />}>
          <Route path='/home' Component={Home} />
          <Route path='/account' Component={Account} />
          <Route path='/products' Component={Products} />
          <Route path='/my-orders' Component={MyOrders} />
          <Route path='/order-details/:id' Component={OrderDetails} />
          <Route path='/my-cart' Component={MyCart} />
          <Route path='/notifications' Component={Notification} />
          <Route path='/checkout' Component={Checkout} />
        </Route>
        <Route path='/' Component={RootRedirect} />
        <Route path='/auth' Component={Auth} />
        <Route path='/admin-dashboard' Component={Admin_Dashboard} />
        <Route element={<SellerRoute/>}>
          <Route path='/seller' Component={Seller_Dashboard} />
        </Route>
      </Routes>

    </>
  )
}

export default App