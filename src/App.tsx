import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./page/Home/Home";
import NoPage from "./page/NoPage/NoPage";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import { Toaster } from "react-hot-toast";
import AddBrand from "./page/Brand/AddBrand/AddBrand";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AddProduct from "./page/Product/AddProduct/AddProduct";
import AllBrands from "./page/Brand/AllBrands";
import AllProducts from "./page/Product/AllProducts";
import EditBrand from "./page/Brand/EditBrand/EditBrand";
import EditProduct from "./page/Product/EditProduct/EditProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route element={<ProtectedRoute />}>
              <Route index element={<Home />} />
              <Route path="brands/add" element={<AddBrand />} />
              <Route path="brands" element={<AllBrands />} />
              <Route path="brands/:brandSlug/edit" element={<EditBrand />} />
              <Route path="products/add" element={<AddProduct />} />
              <Route
                path="products/:productSlug/edit"
                element={<EditProduct />}
              />
              <Route path="products" element={<AllProducts />} />
            </Route>
            <Route path="*" element={<NoPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
