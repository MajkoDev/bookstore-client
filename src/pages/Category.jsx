import useFetch from "@/hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export default function CategoryPage() {
  const { slug } = useParams();

  const { data: category } = useFetch(
    `/api/categories?populate=*&filters[slug][$eq]=${slug}`
  );

  const { data } = useFetch(
    `/api/products?populate=*&[filters][categories][slug]=${slug}&pagination[pageSize]=7`
  );

  return (
    <div>
      <div
        className="h-80 w-full bg-cover rounded-md"
        style={{
          backgroundImage: `url("${category?.[0]?.attributes?.image?.data?.attributes.url}")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          filter: "brightness(0.8)",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full bg-opacity-80 gap-2 px-6 md:px-12">
          <h1 className="text-center font-semibold text-xl md:text-3xl capitalize text-white">
            {category?.[0]?.attributes?.subtitle}
          </h1>
          <h2 className="text-center font-light text-md md:text-xl text-white">
            {category?.[0]?.attributes?.description}
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-1 [&>*:nth-child(even)]:mr-24 [&>*:nth-child(odd)]:ml-24">
        {data?.map((item) => (
          <CategoryCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({ item }) {
  return (
    <article className="p-3 m-2 shadow-xl rounded-md bg-slate-50 max-w-3/4">
      <div className="flex flex-row gap-4 h-full items-center">
        <div className="flex-none">
          <Link to={`/product/${item.attributes.slug}`}>
            <img
              src={
                 item?.attributes?.image?.data[0].attributes.url
              }
              alt="Image of Book"
              className="w-full h-52 md:h-64 object-cover object-center hover:scale-105 duration-300 rounded-sm"
            />
          </Link>
        </div>
        <div className="flex-auto">
          <h1 className="text-slate-900 font-bold text-lg lg:text-xl">
            {item.attributes.title}
          </h1>
          <h2 className="text-slate-700 font-semibold text-md lg:text-md mb-3">
            {item.attributes.author}
          </h2>
          <div className="h-48 overflow-hidden relative text-xs lg:text-sm">
            <BlocksRenderer
              className={`absolute inset-0 overflow-y-auto`}
              content={item.attributes.description}
              blocks={{
                paragraph: ({ children }) => <p className="mb-2">{children}</p>,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
          </div>
        </div>
      </div>
    </article>
  );
}
