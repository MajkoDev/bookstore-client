import useLocalStorage from "@/hooks/useLocalStora";
import { createContext, useCallback, useEffect, useState } from "react";

export const Context = createContext();

export default function AppContext({ children }) {
  // Data from Strapi
  const [products, setProducts] = useState();
  const [categories, setCategories] = useState();

  // Shopping Cart
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const [cartCount, setCartCount] = useLocalStorage(0);
  const [cartSubTotal, setCartSubTotal] = useLocalStorage(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Updating 'cartCount' and 'cartSubTotal' if any change in 'cartItems'
  useEffect(() => {
    let count = 0;
    cartItems?.map((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );
    subTotal = Math.round(subTotal * 100) / 100;

    setCartSubTotal(subTotal);
  }, [cartItems]);

  // CART FUNCTIONS.
  // Add Item to Cart
  const handleAddToCart = (product, quantity) => {
    // copy of current cart items array
    let items = [...cartItems];

    // search items based on id
    let index = items?.findIndex((p) => p.id === product?.id);

    // if product is already in cart, update its quantity
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      // if product is not in cart, add it to cart (with specified quantity)
      product.attributes.quantity = quantity;
      items = [...items, product];
    }

    // update cart items with modified items array
    setCartItems(items);
  };

  // Remove Item from Cart
  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];

    // filter items based of id
    items = items?.filter((p) => p.id !== product?.id);

    setCartItems(items);
  };

  // Changing quantity of product in cart
  const handleCartProductQuantity = useCallback(
    (type, product) => {
      // prevent mutating state
      let items = [...cartItems];
      // find index of product based on id
      let index = items?.findIndex((p) => p.id === product?.id);

      // increment or decrement the quantity based on the type
      if (type === "inc") {
        items[index].attributes.quantity += 1;
      } else if (type === "dec") {
        if (items[index].attributes.quantity === 1) return;
        items[index].attributes.quantity -= 1;
      }
      setCartItems(items);
    },
    [cartItems, setCartItems]
  );

  return (
    <Context.Provider
      value={{
        products,
        setProducts,
        categories,
        setCategories,

        cartItems,
        setCartItems,
        cartCount,
        cartSubTotal,

        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
      }}
    >
      {children}
    </Context.Provider>
  );
}
