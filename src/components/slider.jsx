import { useState } from "react";
import useFetch from "@/hooks/useFetch";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

export default function Slider() {
  const { data } = useFetch(`/api/slider?populate=*`);

  let slides = data?.attributes?.images?.data;

  const [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden flex justify-center items-center relative h-96 rounded-md">
      <div
        className={`flex transition ease-in-out duration-300`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides?.map((s) => {
          return (
            <img
              key={s.id}
              src={`${s.attributes.url}`}
              className="object-cover object-center h-full w-full"
            />
          );
        })}
      </div>
      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
        <button onClick={previousSlide}>
          <ArrowLeftCircle />
        </button>
        <button onClick={nextSlide}>
          <ArrowRightCircle />
        </button>
      </div>
      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides?.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-3 h-3 cursor-pointer  ${
                i == current ? "bg-white" : "bg-slate-300"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
