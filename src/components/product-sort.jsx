import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import ProductFilter from "./product-filter";

const sortOptions = [
  { name: "Price, low to high", value: "asc" },
  { name: "Price, high to low", value: "desc" },
];

export default function ProductSort({
  setSort,
  selectedCats,
  setSelectedCats,
  handleChange,
}) {
  return (
    <div className="flex items-center">
      <Select onValueChange={(value) => setSort(value)}>
        <SelectTrigger className="sm:w-[180px]">
          <SelectValue placeholder="Sort By" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map((option) => (
            <SelectItem key={option.name} value={option.value}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Sheet>
        <SheetContent className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Categories</SheetTitle>
            <SheetDescription>
              Narrow your product search using the options below.
            </SheetDescription>
          </SheetHeader>
          <ProductFilter
            selectedCats={selectedCats}
            setSelectedCats={setSelectedCats}
            handleChange={handleChange}
          />
        </SheetContent>
        <SheetTrigger className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
          <Filter className="h-5 w-5" aria-hidden="true" />
        </SheetTrigger>
      </Sheet>
    </div>
  );
}
