import { useState } from "react";
import { Menu, X } from "lucide-react";

import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";

function Navbar() {

  const [mobileOpen, setMobileOpen] = useState(false);

  return (

    <>

      <header className="sticky top-0 z-50 bg-white shadow-sm">

        {/* Top Navigation */}

        <div className="max-w-7xl mx-auto px-6">

          <div className="h-20 flex items-center justify-between">

            {/* Left */}

            <Logo />

            {/* Desktop Menu */}

            <DesktopMenu />

            {/* Right */}

            <div className="flex items-center gap-5">

              <WishlistButton />

              <CartButton />

              <UserMenu />

              {/* Mobile */}

              <button
                className="lg:hidden"
                onClick={() =>
                  setMobileOpen(!mobileOpen)
                }
              >

                {

                  mobileOpen

                    ? <X size={28} />

                    : <Menu size={28} />

                }

              </button>

            </div>

          </div>

        </div>

      </header>

      {/* Marketplace Search */}

      <SearchBar />

      {

        mobileOpen && (

          <MobileMenu
            closeMenu={() =>
              setMobileOpen(false)
            }
          />

        )

      }

    </>

  );

}

export default Navbar;