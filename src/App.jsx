// Router
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Layout
import RootLayout from "./components/site-layout";

// Pages
import HomePage from "./pages/Home";
import CategoryPage from "./pages/Category";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import CartPage from "./pages/Cart";
import SuccessPage from "./pages/Success";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/product/:slug" element={<ProductPage />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/success" element={<SuccessPage />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
