import { useContext } from "react";
import { Context } from "@/context";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function CartItems() {
  const { cartItems, handleRemoveFromCart, handleCartProductQuantity } =
    useContext(Context);

  return (
    <ul className="divide-y divide-gray-200 border-y border-gray-200 relative">
      <div className="absolute inset-0 bg-slate-100 opacity-70 rounded-lg"></div>

      {cartItems?.map((item) => (
        <li key={item.id} className="flex py-6 sm:py-10 relative m-1 ">
          <div className="shrink-0 pl-6">
            <img
              src={
                 item?.attributes?.image?.data[0].attributes.url
              }
              alt={item.attributes.title}
              className="h-36 w-full rounded-md border-2 border-slate-200 object-cover object-center"
            />
          </div>

          <div className="ml-4 sm:ml-6 flex flex-col justify-between pr-9 w-full">
            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="text-sm ">
                  <Link
                    href={`/products/${item.id}`}
                    className="font-medium text-lg md:text-xl"
                  >
                    {item.attributes.title}
                  </Link>
                </h3>
              </div>
              <p className="mt-1 text-sm md:text-md lg:text-lg font-medium">
                {item.attributes.price.toFixed(2)} €
              </p>
              <p className="mt-1 text-sm lg:text-md font-medium">
                Format: <strong>Paperback</strong>
              </p>
            </div>
            <div className="ml-auto">
              <div className="flex flex-row gap-2 items-center">
                <Button
                  variant="outline"
                  className="text-xl font-semibold"
                  onClick={() => handleCartProductQuantity("inc", item)}
                >
                  +
                </Button>
                <span className="mx-1 text-3lx">
                  {item.attributes.quantity}
                </span>
                <Button
                  variant="outline"
                  className="text-xl font-semibold"
                  onClick={() => handleCartProductQuantity("dec", item)}
                >
                  -
                </Button>

                <Button
                  variant="destructive"
                  type="button"
                  className=""
                  onClick={() => handleRemoveFromCart(item)}
                >
                  <Trash2 className="text-white" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
