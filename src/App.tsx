import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./page/Home/Home";
import NoPage from "./page/NoPage/NoPage";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import { Toaster } from "react-hot-toast";
import AddBrand from "./page/Brand/AddBrand/AddBrand";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="brands/add" element={<AddBrand />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
