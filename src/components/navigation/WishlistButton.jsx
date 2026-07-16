import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

import { useWishlist } from "../../context/WishlistContext";

function WishlistButton() {

  const { wishlistCount } = useWishlist();

  return (

    <Link
      to="/wishlist"
      className="relative flex items-center"
    >

      <Heart
        size={23}
        className="hover:text-red-600 transition"
      />

      {wishlistCount > 0 && (

        <span
          className="
          absolute
          -top-2
          -right-2
          bg-red-600
          text-white
          text-[10px]
          rounded-full
          w-5
          h-5
          flex
          items-center
          justify-center
          font-bold
        "
        >

          {wishlistCount}

        </span>

      )}

    </Link>

  );

}

export default WishlistButton;