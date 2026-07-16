import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Load cart from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add Product
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  // Empty Cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Total Items
  const cartCount = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cartItems]);

  // Total Price
  const cartTotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}