import { useState } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

function UserMenu() {

  const { currentUser } = useAuth();

  const [open, setOpen] = useState(false);

  return (

    <div className="relative">

      {

        currentUser ? (

          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 hover:text-green-700 transition"
          >

            <User size={24} />

          </button>

        ) : (

          <div className="hidden lg:flex items-center gap-3">

            <Link
              to="/login"
              className="font-medium hover:text-green-700"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="bg-green-700 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition"
            >
              Register
            </Link>

          </div>

        )

      }

      {

        currentUser && (

          <ProfileDropdown
            open={open}
          />

        )

      }

    </div>

  );

}

export default UserMenu;