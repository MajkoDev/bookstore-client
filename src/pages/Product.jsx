import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "@/context";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import useFetch from "@/hooks/useFetch";

export default function ProductPage() {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { handleAddToCart } = useContext(Context);

  const { data } = useFetch(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  );

  function decrement() {
    setQuantity((prevState) => {
      if (prevState === 1) return 1;
      return prevState - 1;
    });
  }

  function increment() {
    setQuantity((prevState) => prevState + 1);
  }

  if (!data) return;
  const product = data?.[0]?.attributes;

  return (
    <main className="mx-auto max-w-5xl sm:px-6 sm:pt-16 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="pb-20 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 grid-rows-subgrid">
          <div className="aspect-h-1 aspect-w-1 w-full grid place-items-center">
            <img
              src={product?.image?.data[0].attributes.url}
              alt="Picture of the product"
              className="h-full w-96 border-2 border-gray-200 object-cover object-center shadow-sm sm:rounded-lg"
            />
          </div>
          {/* PRODUCT CARD */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
              {product?.title}
            </h1>

            <h1 className="mt-3 text-lg lg:text-xl tracking-tight text-slate-600 font-light">
              by{" "}
              <Link href="#">
                <span className="text-xl lg:text-2xl font-semibold hover:text-slate-800 hover:cursor-pointer">
                  {product?.author}
                </span>
              </Link>
            </h1>

            {/* SHOPPING */}
            <div className="mt-6 flex flex-col">
              <h3 className="mr-auto my-2 font-bold text-slate-600 dark:text-slate-200">
                Quantity
              </h3>
              <div className="flex flex-row gap-1 font-bold">
                <Button
                  variant="outline"
                  className="text-lg"
                  disabled={quantity <= 1}
                  onClick={decrement}
                >
                  -
                </Button>
                <Input className="w-14 text-center text-lg" value={quantity} />
                <Button
                  variant="outline"
                  className="text-lg"
                  onClick={increment}
                >
                  +
                </Button>
              </div>

              <div className="ml-auto">
                <h2 className="mt-2 ml-2 text-3xl font-bold">
                  {product?.price.toFixed(2)} €
                </h2>
              </div>

              <div className="mt-4">
                <div className="flex justify-center">
                  <Button
                    type="button"
                    onClick={() => {
                      handleAddToCart(data?.[0], quantity);
                      setQuantity(1);
                    }}
                    className="w-2/3 bg-lime-600 py-6 text-base font-medium text-white hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-lime-500"
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">
              <h3 className="my-2 font-bold text-xl text-slate-600 dark:text-slate-200 ml-auto">
                Description
              </h3>

              {product?.description ? (
                <BlocksRenderer
                  content={product.description}
                  blocks={{
                    paragraph: ({ children }) => (
                      <p className="mb-2 text-sm md:text-md lg:text-base">
                        {children}
                      </p>
                    ),
                  }}
                />
              ) : null}
            </div>

            {/* PRODUCT DETAILS */}
            <div className="mt-8">
              <h3 className="my-2 font-bold text-xl text-slate-600 dark:text-slate-200 ml-auto">
                Product Details
              </h3>
              <ProductInformations type="Pages" bookInfo={product?.pages} />
              <ProductInformations
                type="Language"
                bookInfo={product?.language}
              />
              <ProductInformations
                type="Publisher"
                bookInfo={product?.publisher}
              />
              {product?.format ? (
                <ProductInformations type="Format" bookInfo={product?.format} />
              ) : null}
              <ProductInformations type="ISBN-13" bookInfo={product?.isbn13} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function ProductInformations({ type, bookInfo }) {
  return (
    <div className="flex flex-row gap-2">
      <div className="w-20">
        <p className="text-slate-400 font-light">{type}</p>
      </div>
      <div className="flex-1">
        <p className="text-slate-800 capitalize font-medium">{bookInfo}</p>
      </div>
    </div>
  );
}
