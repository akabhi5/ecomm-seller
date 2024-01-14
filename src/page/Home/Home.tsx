import { Link } from "react-router-dom";
import BrandList from "../../components/Dashboard/BrandList/BrandList";
import ProductList from "../../components/Dashboard/ProductList/ProductList";
import SellerAction from "../../components/SellerAction/SellerAction";

const Home = () => {
  return (
    <>
      <div>Home</div>

      <div className="my-8">
        <SellerAction />
      </div>

      <div>
        <div className="grid lg:grid-flow-col grid-flow-row grid-cols-1 lg:grid-cols-12">
          <div className="col-span-1 lg:col-span-6 border rounded-md p-2 m-2">
            <BrandList />
          </div>
          <div className="col-span-1 lg:col-span-6 border rounded-md p-2 m-2">
            <ProductList />
            <div className="relative bottom-0 right-0">
              <Link to="/products">View all products</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
