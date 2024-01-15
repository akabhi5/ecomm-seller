import { useQuery } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { Product } from "../../../types/Product";
import { queryStaleTime } from "../../../utils";
import { Link } from "react-router-dom";

const ProductList = () => {
  const { isPending, data: products } = useQuery({
    queryKey: ["seller-products"],
    queryFn: () => http.get("/products/"),
    staleTime: queryStaleTime,
  });

  if (isPending) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  if (products?.data.length <= 0) {
    return (
      <div>
        <div>No products to show</div>
        <Link
          to="/products/add"
          className="text-xs float-right text-slate-600 underline"
        >
          Add products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl underline">Products</div>
      <div>
        <ul>
          {products?.data.map((product: Product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
      <Link
        to="/products"
        className="text-xs float-right text-slate-600 underline"
      >
        View all products
      </Link>
    </div>
  );
};

export default ProductList;
