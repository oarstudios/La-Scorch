import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/home/Home';
import FullCategoryPage from './components/fullCategory/FullCategoryPage';
import ProductDetails from './components/productPage/ProductDetails';
import Navbar from './components/home/Navbar';
import Footer from './components/home/Footer';
import YouMayAlsoLike from './components/YouMayAlsoLike/YouMayAlsoLike';
import NotFound from './components/NotFound/NotFound';
import CartPage from './components/cartPage/CartPage';
import CheckoutPage from './components/checkoutPage/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation/OrderConfirmation';
import TrackOrder from './components/TrackOrder/TrackOrder';
import MyOrders from './components/MyOrders/MyOrders';
import MyAccount from './components/MyAccount/MyAccount';
import ContactUs from './components/ContactUs/ContactUs';

// 🧠 ADMIN COMPONENTS IMPORT
import AdminNavbar from './components/Admin/AdminNavbar';
import AdminProducts from './components/Admin/AdminProducts';
import AddNewProduct from './components/Admin/AddNewProduct';
import EditAdminProducts from './components/Admin/EditAdminProducts';
import AdminOrders from './components/Admin/AdminOrders';
import AdminCustomersDetails from './components/Admin/AdminCustomersDetails';
import AdminDashboard from './components/Admin/AdminDashboard';
import QuickPricing from './components/Admin/QuickPricing';
import DeliveryPricing from './components/Admin/DeliveryPricing';
import Creatives from './components/Admin/Creatives';

import "./App.css"
import "./index.css"
import ScrollToTop from './components/ScrollToTop';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {/* Show only non-admin layout for user pages */}
      {!location.pathname.startsWith('/admin') && <Navbar />}

      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<FullCategoryPage />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/my-account" element={<MyAccount />} />
        <Route path="/contact-us" element={<ContactUs />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin/*"
          element={
            <>
              <AdminNavbar />
              <Routes>
                <Route path="products" element={<AdminProducts />} />
                <Route path="add-product" element={<AddNewProduct />} />
                <Route path="edit-product" element={<EditAdminProducts />} />
                <Route path="customer-orders" element={<AdminOrders />} />
                <Route path="customers" element={<AdminCustomersDetails />} />
                <Route path="" element={<AdminDashboard />} />
                <Route path="quick-pricing" element={<QuickPricing />} />
                <Route path="delivery-pricing" element={<DeliveryPricing />} />
                <Route path="creatives" element={<Creatives />} />
              </Routes>
            </>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Conditionally render components */}
      {location.pathname === '/product' && <YouMayAlsoLike />}
      {!location.pathname.startsWith('/admin') && <Footer />}
    </>
  );
};


function App() {
  return (
    <Router>
      <ScrollToTop/>
      <AppContent />
    </Router>
  );
}

export default App;
