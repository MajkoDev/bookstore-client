import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useFetch from "@/hooks/useFetch";

export default function ProductFilter({ setMaxPrice, maxPrice, handleChange }) {
  const { data: categories } = useFetch(`api/categories`);

  return (
    <form className="sticky top-20">
      {/* Range of Price */}
      <div className="">
        <h2 className="text-lg font-medium">Pricing</h2>
        <div className="w-full mb-3 font-medium text-lg text-slate-600">
          <input
            type="range"
            className="range h-2 w-full mb-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            min={8}
            max={30}
            step={0.1}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <div className="w-full flex flex-row justify-end">
            <p className="">{maxPrice} €</p>
          </div>
        </div>
      </div>

      {/* Categories of Product */}
      <Accordion type="single" collapsible>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <h1>Categories</h1>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {categories?.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id={category.id}
                    value={category.id}
                    onChange={handleChange}
                    className="form-checkbox h-4 w-4 cursor-pointer"
                  />
                  <label
                    for={category.id}
                    className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                  >
                    {category.attributes.title}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </form>
  );
}
