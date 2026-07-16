import { Link } from "react-router-dom";
import { User, LogOut, ShoppingCart } from "lucide-react";

import { useAuth } from "../context/AuthContext";


function Navbar() {

  const { currentUser, logout } = useAuth();


  return (

    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">


      {/* Logo */}

      <Link
        to="/"
        className="text-2xl font-bold text-green-700"
      >
        ODIANOSE
      </Link>



      {/* Navigation */}

      <div className="flex items-center gap-6">


        <Link
          to="/"
          className="text-gray-700 hover:text-green-700"
        >
          Home
        </Link>



        <Link
          to="/marketplace"
          className="text-gray-700 hover:text-green-700"
        >
          Marketplace
        </Link>



        <Link
          to="/cart"
          className="flex items-center gap-1 text-gray-700 hover:text-green-700"
        >

          <ShoppingCart size={20}/>

          Cart

        </Link>



        {
          currentUser ? (

            <>


              <Link
                to="/account"
                className="flex items-center gap-2 text-green-700 font-semibold"
              >

                <User size={20}/>

                Account

              </Link>



              <button
                onClick={logout}
                className="flex items-center gap-2 text-red-600"
              >

                <LogOut size={20}/>

                Logout

              </button>


            </>


          ) : (

            <>

              <Link
                to="/login"
                className="text-green-700 font-semibold"
              >
                Login
              </Link>


              <Link
                to="/register"
                className="bg-green-700 text-white px-5 py-2 rounded-lg"
              >
                Register
              </Link>

            </>

          )

        }


      </div>


    </nav>

  );

}


export default Navbar;