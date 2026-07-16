import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

  const [wishlistItems, setWishlistItems] = useState(() => {

    const savedWishlist = localStorage.getItem("wishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

  });

  useEffect(() => {

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistItems)
    );

  }, [wishlistItems]);



  // Add Product

  const addToWishlist = (product) => {

    const exists = wishlistItems.find(

      (item) => item.id === product.id

    );

    if (exists) return;

    setWishlistItems((prev) => [

      ...prev,

      product,

    ]);

  };



  // Remove Product

  const removeFromWishlist = (id) => {

    setWishlistItems((prev) =>

      prev.filter((item) => item.id !== id)

    );

  };



  // Check Product

  const isInWishlist = (id) => {

    return wishlistItems.some(

      (item) => item.id === id

    );

  };



  // Empty Wishlist

  const clearWishlist = () => {

    setWishlistItems([]);

  };



  const wishlistCount = useMemo(() => {

    return wishlistItems.length;

  }, [wishlistItems]);



  return (

    <WishlistContext.Provider

      value={{

        wishlistItems,

        wishlistCount,

        addToWishlist,

        removeFromWishlist,

        clearWishlist,

        isInWishlist,

      }}

    >

      {children}

    </WishlistContext.Provider>

  );

}



export function useWishlist() {

  return useContext(WishlistContext);

}