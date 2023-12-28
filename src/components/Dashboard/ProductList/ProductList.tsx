import { useQuery } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { Product } from "../../../types/Product";

const ProductList = () => {
  const { isPending, data: categories } = useQuery({
    queryKey: ["dashboard-products"],
    queryFn: () => http.get("/products/"),
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
