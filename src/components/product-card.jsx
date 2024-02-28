import { Link } from "react-router-dom";

export default function ProductCard({ item }) {
  return (
    <Link className="group text-sm" to={`/product/${item.attributes.slug}`}>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-sm">
        <img
          src={item?.attributes?.image?.data[0].attributes?.url}
          alt={item.attributes.title}
          className="w-full h-full sm:h-80 md:h-96 lg:h-80 xl:h-96 object-cover object-center hover:scale-105 duration-300"
        />
        <div className="pl-1">
          <h3 className="pt-3 text-[18px] font-semibold">
            {item.attributes.title}
          </h3>
          <p className="mt-1 font-base text-slate-600">
            {item.attributes.author}
          </p>
        </div>
      </div>
    </Link>
  );
}
