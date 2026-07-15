import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import AdminHome from './pages/admin/AdminHome'
import AddProduct from './pages/admin/AddProduct'
import EditProduct from './pages/admin/EditProduct'
import ManageCategories from './pages/admin/ManageCategories'
import ManageProducts from './pages/admin/ManageProducts'
import NotFound from './pages/NotFound'
import NavigationBar from './components/NavigationBar'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'
import MyOrders from './pages/auth/MyOrders'
import Profile from './pages/auth/Profile'

function App() {
  

  return (
    <>
      <NavigationBar />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/product/:id" element={ <ProductDetails /> } />
        <Route path="/admin" element={ <AdminHome /> } />
        <Route path="/admin/add-product" element={ <AddProduct /> } />
        <Route path="/admin/edit-product/:id" element={ <EditProduct /> } />
        <Route path="/admin/manage-categories" element={ <ManageCategories /> } />
        <Route path="/admin/manage-products" element={ <ManageProducts /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/my-orders" element={ <MyOrders /> } />
        <Route path="/profile" element={ <Profile /> } />


        <Route path="/*" element={ <NotFound /> } />
      </Routes>
    </>
  )
}

export default App
