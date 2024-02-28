import { useContext } from "react";
import { Context } from "@/context";

import { loadStripe } from "@stripe/stripe-js";
import { makePaymentRequest } from "@/lib/api";

import CartItems from "@/components/cart-items";
import CartSummary from "@/components/cart-summary";
import CartItemsEmpty from "@/components/cart-items-empty";

function CartPage() {
  const { cartItems } = useContext(Context);

  const stripePromise = loadStripe(
    "pk_test_51Ok9HJF1IXYkC9JQzInVqi4B5eIgwIP2tqyeF6rBPLjzIqlQ1yJJ7t8DCMpLwJrNqI0xAl3SpLVBWZ331kKJcxdx00HNeLQlcO"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;
      const res = await makePaymentRequest.post("/api/orders", {
        products: cartItems,
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <main className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Shopping Cart
          </h1>

          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              {!cartItems.length && <CartItemsEmpty />}
              {!!cartItems.length && <CartItems />}
            </section>
            <CartSummary handlePayment={handlePayment} />
          </div>
        </main>
      </div>
    </>
  );
}

export default CartPage;
