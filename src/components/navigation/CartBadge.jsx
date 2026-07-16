import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../Context/CartContext";

function CartBadge() {

  const { cartCount } = useCart();

  return (

    <Link
      to="/cart"
      className="relative flex items-center justify-center"
    >

      <ShoppingCart
        size={24}
        className="text-gray-700 hover:text-green-700 transition"
      />

      {cartCount > 0 && (

        <span
          className="
            absolute
            -top-2
            -right-2
            bg-red-600
            text-white
            text-xs
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

export default CartBadge;