import { useQuery } from "@tanstack/react-query";
import { http } from "../../../api-client";
import { Brand } from "../../../types/Brand";
import { queryStaleTime } from "../../../utils";

const BrandList = () => {
  const { isPending, data: brands } = useQuery({
    queryKey: ["seller-brands"],
    queryFn: () => http.get("/brands/"),
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
      <div className="text-xl underline">Brands</div>
      <div>
        <ul>
          {brands?.data.map((brand: Brand) => (
            <li key={brand.id}>{brand.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BrandList;
