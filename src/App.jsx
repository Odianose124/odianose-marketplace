import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import OnboardingRoute from "./components/OnboardingRoute";


// Public Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Register from "./pages/Register";
import Login from "./pages/Login";


// Buyer Pages
import Wishlist from "./pages/Wishlist";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyOrders from "./pages/MyOrders";


// Onboarding
import CompleteProfile from "./pages/onboarding/CompleteProfile";


// Smart Requests
import CreateRequest from "./pages/requests/CreateRequest";
import MyRequests from "./pages/requests/MyRequests";
import RequestDetails from "./pages/requests/RequestDetails";


// Seller Pages
import BecomeSeller from "./pages/BecomeSeller";
import BusinessInformation from "./pages/BusinessInformation";
import SellerDashboard from "./pages/SellerDashboard";
import AddProduct from "./pages/AddProduct";
import MyProducts from "./pages/MyProducts";
import SellerOrders from "./pages/SellerOrders";
import EditProduct from "./pages/EditProduct";
import SubmitOffer from "./pages/seller/SubmitOffer";
import NearbyRequests from "./pages/seller/NearbyRequests";



function App() {

  return (

    <Routes>


      {/* ========================= */}
      {/* PUBLIC ROUTES */}
      {/* ========================= */}


      <Route path="/" element={<Home />} />

      <Route path="/services" element={<Services />} />

      <Route path="/marketplace" element={<Marketplace />} />

      <Route
        path="/marketplace/product/:id"
        element={<ProductDetails />}
      />


      <Route
        path="/register"
        element={<Register />}
      />


      <Route
        path="/login"
        element={<Login />}
      />



      {/* ========================= */}
      {/* ONBOARDING */}
      {/* ========================= */}


      <Route
        path="/complete-profile"
        element={
          <OnboardingRoute>
            <CompleteProfile />
          </OnboardingRoute>
        }
      />





      {/* ========================= */}
      {/* BUYER ROUTES */}
      {/* ========================= */}


      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <Account />
          </ProtectedRoute>
        }
      />


      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />


      <Route
        path="/wishlist"
        element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        }
      />


      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />


      <Route
        path="/payment-success"
        element={
          <ProtectedRoute>
            <PaymentSuccess />
          </ProtectedRoute>
        }
      />


      <Route
        path="/my-orders"
        element={
          <ProtectedRoute>
            <MyOrders />
          </ProtectedRoute>
        }
      />





      {/* ========================= */}
      {/* SMART REQUEST ROUTES */}
      {/* ========================= */}


      <Route
        path="/create-request"
        element={
          <ProtectedRoute>
            <CreateRequest />
          </ProtectedRoute>
        }
      />


      <Route
        path="/my-requests"
        element={
          <ProtectedRoute>
            <MyRequests />
          </ProtectedRoute>
        }
      />


      <Route
        path="/request/:id"
        element={
          <ProtectedRoute>
            <RequestDetails />
          </ProtectedRoute>
        }
      />







      {/* ========================= */}
      {/* SELLER ROUTES */}
      {/* ========================= */}



      <Route
        path="/become-seller"
        element={
          <ProtectedRoute>
            <BecomeSeller />
          </ProtectedRoute>
        }
      />



      <Route
        path="/seller/business-info"
        element={
          <ProtectedRoute>
            <BusinessInformation />
          </ProtectedRoute>
        }
      />



      <Route
        path="/seller-dashboard"
        element={
          <ProtectedRoute>
            <SellerDashboard />
          </ProtectedRoute>
        }
      />



      <Route
        path="/seller/nearby-requests"
        element={
          <ProtectedRoute>
            <NearbyRequests />
          </ProtectedRoute>
        }
      />



      <Route
        path="/seller/offer/:id"
        element={
          <ProtectedRoute>
            <SubmitOffer />
          </ProtectedRoute>
        }
      />



      <Route
        path="/add-product"
        element={
          <ProtectedRoute>
            <AddProduct />
          </ProtectedRoute>
        }
      />



      <Route
        path="/my-products"
        element={
          <ProtectedRoute>
            <MyProducts />
          </ProtectedRoute>
        }
      />



      <Route
        path="/seller-orders"
        element={
          <ProtectedRoute>
            <SellerOrders />
          </ProtectedRoute>
        }
      />



      <Route
        path="/edit-product/:id"
        element={
          <ProtectedRoute>
            <EditProduct />
          </ProtectedRoute>
        }
      />







      {/* ========================= */}
      {/* FALLBACK */}
      {/* ========================= */}


      <Route
        path="*"
        element={<Home />}
      />


    </Routes>

  );

}


export default App;