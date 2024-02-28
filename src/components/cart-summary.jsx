import { useContext } from "react";
import { Context } from "@/context";
import { Button } from "./ui/button";

export default function CartSummary({ handlePayment }) {
  const { cartSubTotal } = useContext(Context);

  return (
    <section
      aria-labelledby="summary-heading"
      className="mt-16 rounded-lg border-2 border-slate-200 bg-slate-50 px-4 py-6 shadow-md sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 id="summary-heading" className="text-lg font-medium">
        Order summary
      </h2>

      <dl className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <dt className="text-sm">Subtotal</dt>
          <dd className="text-sm font-medium">{cartSubTotal.toFixed(2)} Eur</dd>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <dt className="flex items-center text-sm">
            <span>Shipping estimate</span>
          </dt>
          <dd className="text-sm font-medium">0 Eur </dd>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
          <dt className="text-base font-medium">Order total</dt>
          <dd className="text-base font-medium">{cartSubTotal.toFixed(2)} €</dd>
        </div>
      </dl>

      <div className="mt-6">
        <Button className="w-full" onClick={handlePayment}>
          Checkout
        </Button>
      </div>
    </section>
  );
}
