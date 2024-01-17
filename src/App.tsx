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
import Product from "./page/Product/Product";
import EditBrand from "./page/Brand/EditBrand/EditBrand";

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
              <Route path="products" element={<Product />} />
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
