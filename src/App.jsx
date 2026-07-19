import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Wishlist from "./pages/Wishlist";
import CompleteProfile from "./pages/onboarding/CompleteProfile";
import OnboardingRoute from "./components/OnboardingRoute";
import CreateRequest from "./pages/requests/CreateRequest";
import MyRequests from "./pages/requests/MyRequests";
import RequestDetails from "./pages/requests/RequestDetails";
import SubmitOffer from "./pages/seller/SubmitOffer";


// Public Pages
import Home from "./pages/Home";
import Services from "./pages/Services";
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";

import Register from "./pages/Register";
import Login from "./pages/Login";


// User Pages
import Account from "./pages/Account";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import MyOrders from "./pages/MyOrders";


// Seller Pages
import SellerDashboard from "./pages/SellerDashboard";
import MyProducts from "./pages/MyProducts";
import SellerOrders from "./pages/SellerOrders";
import EditProduct from "./pages/EditProduct";
import AddProduct from "./pages/AddProduct";


// Protection
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>
      


      {/* PUBLIC */}

      <Route path="/" element={<Home />} />

      <Route path="/services" element={<Services />} />

      <Route path="/marketplace" element={<Marketplace />} />

      <Route 
        path="/marketplace/product/:id" 
        element={<ProductDetails />} 
      />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />
      <Route
  path="/complete-profile"
  element={
    <OnboardingRoute>
      <CompleteProfile />
    </OnboardingRoute>
  }
/>



      {/* USER */}

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
      <Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>



      {/* SELLER */}


      <Route
        path="/seller-dashboard"
        element={
          <ProtectedRoute>
            <SellerDashboard />
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

      <Route
  path="/seller/offer/:id"
  element={<SubmitOffer />}
/>



      {/* FALLBACK */}

      <Route 
        path="*" 
        element={<Home />} 
      />


       </Routes>
  );
}


export default App;