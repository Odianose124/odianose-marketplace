import { Bell, Search, BadgeCheck } from "lucide-react";

import { useSeller } from "../../context/SellerContext";
import { useAuth } from "../../context/AuthContext";


function DashboardHeader() {

  const { sellerProfile } = useSeller();
  const { currentUser } = useAuth();



  const businessName =
    sellerProfile?.businessName ||
    currentUser?.displayName ||
    "Seller";



  const profileImage =
    sellerProfile?.photoURL ||
    currentUser?.photoURL ||
    "https://ui-avatars.com/api/?name=Seller";



  const verified =
    sellerProfile?.verification?.verified || false;



  return (

    <div className="bg-white rounded-3xl shadow-sm border p-6 flex flex-col md:flex-row justify-between items-center gap-5">


      {/* Seller Information */}

      <div>


        <p className="text-gray-500 text-sm">
          Welcome Back 👋
        </p>



        <div className="flex items-center gap-3">


          <h1 className="text-3xl font-bold text-green-700">

            {businessName}

          </h1>



          {verified && (

            <BadgeCheck
              className="text-blue-600"
              size={28}
            />

          )}


        </div>



        <p className="text-gray-500 mt-2">

          Manage your business, orders and customer requests.

        </p>



      </div>





      {/* Actions */}


      <div className="flex items-center gap-4">



        <button
          className="relative p-3 rounded-xl bg-gray-100 hover:bg-green-100 transition"
        >

          <Bell size={22}/>


          <span
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >

            3

          </span>


        </button>





        <button
          className="p-3 rounded-xl bg-gray-100 hover:bg-green-100 transition"
        >

          <Search size={22}/>

        </button>





        <img

          src={profileImage}

          alt="Seller Profile"

          className="w-14 h-14 rounded-full object-cover border-2 border-green-600"

        />



      </div>



    </div>

  );

}


export default DashboardHeader;