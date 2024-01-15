import BrandList from "../../components/Dashboard/BrandList/BrandList";
import ProductList from "../../components/Dashboard/ProductList/ProductList";
import SellerAction from "../../components/SellerAction/SellerAction";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-8">
        <SellerAction />
      </div>

      <div>
        <div className="grid lg:grid-flow-col grid-flow-row grid-cols-1 lg:grid-cols-12 lg:space-x-4 space-y-4 lg:space-y-0">
          <div className="col-span-1 lg:col-span-6 border rounded-md p-3">
            <BrandList />
          </div>
          <div className="col-span-1 lg:col-span-6 border rounded-md p-3">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
