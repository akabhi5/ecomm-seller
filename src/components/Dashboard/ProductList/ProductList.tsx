import { useQuery } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { Product } from "../../../types/Product";
import { queryStaleTime } from "../../../utils";

const ProductList = () => {
  const { isPending, data: categories } = useQuery({
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

  return (
    <div>
      <div className="text-xl">Products</div>
      <div>
        <ul>
          {categories?.data.map((product: Product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
