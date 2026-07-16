import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import { useCart } from "../../context/CartContext";

function CartButton() {

  const { cartCount } = useCart();

  return (

    <Link
      to="/cart"
      className="relative flex items-center"
    >

      <ShoppingCart
        size={23}
        className="hover:text-green-700 transition"
      />

      {cartCount > 0 && (

        <span
          className="
          absolute
          -top-2
          -right-2
          bg-green-700
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

          {cartCount}

        </span>

      )}

    </Link>

  );

}

export default CartButton;