// Context
import AppContext from "@/context";

// Router
import { Outlet } from "react-router";

// Components
import Footer from "./site-footer";
import Header from "./site-header";

export default function RootLayout() {
  return (
    <>
      <AppContext>
        <Header />
        <div className="relative px-[1.4rem] md:px-[4rem] lg:px-[6rem] xl:px-[8rem] 2xl:px-[12rem] min-h-[50vh] bg-[F1ECE4]">
          <div class="blob w-[800px] h-[800px] rounded-[999px] absolute top-0 right-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"></div>
          <div class="blob w-[1000px] h-[1000px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-red-200 via-gray-100 to-blue-100"></div>
          <div class="blob w-[600px] h-[600px] rounded-[999px] absolute bottom-0 left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-slate-100 via-teal-100 to-blue-100"></div>
          <div class="blob w-[300px] h-[300px] rounded-[999px] absolute bottom-[-10px] left-0 -z-10 blur-3xl bg-opacity-60 bg-gradient-to-r from-green-200 via-cyan-200 to-Fuchsia-300"></div>

          <div className="relative">
            <Outlet />
          </div>
        </div>
        <Footer />
      </AppContext>
    </>
  );
}
