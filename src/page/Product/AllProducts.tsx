import { useQuery } from "@tanstack/react-query";
import { http } from "../../api-client";
import { queryStaleTime } from "../../utils";
import { Product } from "../../types/Product";
import MoveToCentre from "../../components/MoveToCentre/MoveToCentre";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const { isPending, data: products } = useQuery<Product[]>({
    queryKey: ["seller-products"],
    queryFn: () => http.get("/products/").then((response) => response.data),
    staleTime: queryStaleTime,
  });

  if (isPending) {
    return (
      <MoveToCentre>
        <progress className="progress w-56"></progress>
      </MoveToCentre>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {products?.map((product) => (
          <Link key={product.id} to={`/products/${product.slug}/edit`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
