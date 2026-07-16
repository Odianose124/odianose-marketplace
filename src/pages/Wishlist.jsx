import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";

function Wishlist() {

  const { wishlistItems } = useWishlist();

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-4xl font-bold">
          My Wishlist
        </h1>

        <p className="text-gray-500 mt-2 mb-10">
          {wishlistItems.length} Product
          {wishlistItems.length !== 1 ? "s" : ""} Saved
        </p>

        {
          wishlistItems.length === 0 ? (

            <div className="bg-white rounded-3xl shadow-md py-20 text-center">

              <h2 className="text-3xl font-bold">

                Your Wishlist is Empty

              </h2>

              <p className="text-gray-500 mt-3">

                Save products by clicking the ❤️ icon.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

              {

                wishlistItems.map((product) => (

                  <ProductCard

                    key={product.id}

                    {...product}

                  />

                ))

              }

            </div>

          )
        }

      </main>

    </>
  );

}

export default Wishlist;