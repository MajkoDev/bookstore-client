import { useState } from "react";
import { cn } from "@/lib/utils";
import useFetch from "@/hooks/useFetch";

import ProductSort from "@/components/product-sort";
import ProductCard from "@/components/product-card";
import ProductFilter from "@/components/product-filter";

export default function ProductsPage() {
  // Sorting and Filtering
  const [sort, setSort] = useState("asc");
  const [maxPrice, setMaxPrice] = useState(30);
  const [selectedCats, setSelectedCats] = useState([]);
  const categoryFilters = selectedCats
    .map((item) => `&[filters][categories][id][$eq]=${item}`)
    .join("");

  // Fetching Products Data
  const { data, loading } = useFetch(
    `/api/products?populate=*&[filters][price][$lt]=${maxPrice}${categoryFilters}&sort=price:${sort}`
  );

  console.log(data);

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCats(
      isChecked
        ? [...selectedCats, value]
        : selectedCats.filter((item) => item !== value)
    );
  };

  return (
    <div className="min-h-[65vh]">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 bg-slate-100 opacity-30 rounded-lg"></div>
        <div className="rounded-lg flex flex-col items-center justify-center h-60 relative">
          <p className="mx-12 text-lg lg:text-xl text-slate-950 font-light text-center italic">
            Step into a world of literary wonders, where imagination knows no
            bounds and every story has the power to transport you to new and
            captivating realms.
          </p>
        </div>
      </section>

      <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-6">
        {/* Number of Results */}
        <h2 className="text-center text-2xl font-semibold text-slate-500">
          {loading ? (
            "searching for results..."
          ) : (
            <p className="text-slate-950">
              {!data || data?.length === 0
                ? "I didn't find any results"
                : `${data?.length} result${data?.length === 1 ? "" : "s"}`}
            </p>
          )}
        </h2>
        <ProductSort
          setSort={setSort}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          selectedCats={selectedCats}
          setSelectedCats={setSelectedCats}
          handleChange={handleChange}
        />
      </div>
      <section className="pb-24 pt-6">
        <div
          className={cn(
            "grid grid-cols-1 gap-x-8 gap-y-10",
            data?.length > 0 ? "lg:grid-cols-4" : "lg:grid-cols-[1fr_3fr]"
          )}
        >
          <div className="hidden lg:block">
            {/* Filters */}
            <ProductFilter
              handleChange={handleChange}
              setSelectedCats={setSelectedCats}
              setMaxPrice={setMaxPrice}
              maxPrice={maxPrice}
            />
          </div>
          <div className="grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-3 lg:col-span-3 lg:gap-x-4">
            {/* Product Grid */}
            {data?.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
