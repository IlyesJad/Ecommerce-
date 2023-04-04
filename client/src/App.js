import{Routes,Route} from 'react-router-dom'
import AboutUs from './pages/AboutUs';
import Register from './pages/Auth/Register';
import Contact from './pages/Contact';
import Home from './pages/Home'
import PagenotFound from './pages/PagenotFound';
import Policy from './pages/Policy';
import toast, { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/Layout/Routes/Private';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoute from './components/Layout/Routes/Admin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Products';
import { UpdateProduct } from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CartPage from './pages/user/CartPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/search" element={<Search/>} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/categories/:slug" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/orders" element={<Orders/>} />
        <Route path="user/profile" element={<Profile/>} />
        </Route>
        <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>} />
        <Route path="admin/create-category" element={<CreateCategory/>} />
        <Route path="admin/create-product" element={<CreateProduct/>} />
        <Route path="admin/product/:slug" element={<UpdateProduct/>} />
        <Route path="admin/products" element={<Products/>} />
        <Route path="admin/users" element={<Users/>} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/about" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/policy" element={<Policy/>} />
        <Route path="*" element={<PagenotFound/>} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
